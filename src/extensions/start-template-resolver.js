/* eslint-disable no-param-reassign */

/**
 * @typedef {import('gluegun').GluegunToolbox} GluegunToolbox
 */

const hyperquest = require('hyperquest');
const { unpack } = require('tar-pack');

const { PackageManager } = require('../tools/package-manager');

const {
  MessageType,
  PrintMessage,
  PrintNewLine,
} = require('../tools/terminal');

/**
 * @param {GluegunToolbox} toolbox
 */
module.exports = async (toolbox) => {
  /**
   * @param {string} technologyType
   * @param {string} appName
   */
  toolbox.startTemplateResolver = async (technologyType, appName) => {
    const stream = hyperquest(
      `https://codeload.github.com/neutronjs/neutron-start-${technologyType}-template/tar.gz/master`,
    );

    await new Promise((resolve, reject) => {
      stream.pipe(
        unpack(appName, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(appName);
          }
        }),
      );
    });

    const packageJsonPath = `./${appName}/package.json`;

    const { filesystem, strings } = toolbox;
    const packageJson = filesystem.read(packageJsonPath, 'json');

    if (packageJson.name) {
      filesystem.write(packageJsonPath, { ...packageJson, name: appName });
    } else {
      // expo project do not contains "name" in package.json
      const appJsonPath = `./${appName}/app.json`;
      const appJson = filesystem.read(appJsonPath, 'json');
      const pascalCaseAppName = strings.pascalCase(appName);

      filesystem.write(appJsonPath, {
        ...appJson,
        expo: { ...appJson.expo, name: pascalCaseAppName, slug: appName },
      });
    }

    const dependencies = Object.keys(packageJson.dependencies).reduce(
      (acc, item) => {
        if (!/^http/.test(packageJson.dependencies[item])) {
          return acc.concat(item);
        }
        return acc;
      },
      [],
    );

    const devDependencies = Object.keys(packageJson.devDependencies).reduce(
      (acc, item) => {
        if (!/^http/.test(packageJson.devDependencies[item])) {
          return acc.concat(item);
        }
        return acc;
      },
      [],
    );

    const packageManager = new PackageManager();

    PrintNewLine();
    PrintMessage(
      'Installing packages required by your application in production...',
      MessageType.INFO,
    );
    await packageManager.install(appName, dependencies, false);

    PrintNewLine();
    PrintMessage(
      'Installing packages that are only needed for local development and testing...',
      MessageType.INFO,
    );
    await packageManager.install(appName, devDependencies, true);
  };
};
