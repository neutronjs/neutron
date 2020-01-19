/* eslint-disable no-param-reassign */

/**
 * @typedef {import('gluegun').GluegunToolbox} GluegunToolbox
 */

const hyperquest = require('hyperquest');
const { unpack } = require('tar-pack');

const { PackageManager } = require('../tools/package-manager');
const { version } = require('../../package.json');

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
    const neutronDownloadsUrl = 'https://github.com/neutronjs/neutron/releases/download';
    const templateUrl = `${neutronDownloadsUrl}/v${version}/neutron-start-${technologyType}-template.tar.gz`;

    const stream = await new Promise((resolve, reject) => {
      const isRedirect = (status) => [301, 302, 307, 308].indexOf(status) >= 0;

      const request = (url) => {
        const result = hyperquest(url, {}, (err, res) => {
          if (err) reject(err);

          if (isRedirect(res.statusCode)) {
            request(res.headers.location);
          } else {
            resolve(result);
          }
        });
      };

      request(templateUrl);
    });

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

    const { filesystem, strings } = toolbox;

    const packageJsonPath = `./${appName}/package.json`;
    const packageJson = filesystem.read(packageJsonPath, 'json');
    filesystem.write(packageJsonPath, {
      ...packageJson,
      name: appName,
      version: '1.0.0',
    });

    if ('expo' in packageJson.dependencies) {
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
      '📦 Installing packages required by your application in production...',
      MessageType.DEFAULT,
    );
    await packageManager.install(appName, dependencies, false);

    PrintNewLine();
    PrintMessage(
      '📦 Installing packages that are only needed for local development and testing...',
      MessageType.DEFAULT,
    );
    await packageManager.install(appName, devDependencies, true);
  };
};
