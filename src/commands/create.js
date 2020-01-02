/**
 * @typedef {import('gluegun').GluegunToolbox} GluegunToolbox
 */

const { GetSettings } = require('../utils/settings');
const { PackageManager } = require('../tools/package-manager');

const { TechnologyType } = require('../utils/technology');

const {
  MessageType,
  PrintMessage,
  PrintDivider,
  PrintNewLine,
} = require('../tools/terminal');

class HelpInfo {
  static get Message() {
    return 'Usage: neutron create <YourAppName> <technology>';
  }

  static get Technologies() {
    return {
      Text: 'Technologies:',
      Rows: [
        '--react          New project with ReactJS',
        '--react-native   New project with React Native',
      ],
    };
  }
}

class CreateCommand {
  get name() {
    return 'create';
  }

  /**
   * @param {GluegunToolbox} toolbox
   */
  async run(toolbox) {
    const { parameters, filesystem, template, system, strings } = toolbox;

    if (!parameters.options.h && parameters.first) {
      const { react, reactNative } = parameters.options;

      if (react !== reactNative) {
        const technologyType = react
          ? TechnologyType.REACT
          : TechnologyType.REACT_NATIVE;
        const settings = GetSettings(technologyType);

        const { first: appName } = parameters;
        const pascalCaseAppName = strings.pascalCase(appName);

        if (!appName) {
          PrintMessage('The app name is not provided', MessageType.ERROR);
          return;
        }

        if (Array.isArray(settings.requirements)) {
          const requirementList = [];

          settings.requirements.forEach((requirement) => {
            if (!system.which(requirement)) {
              requirementList.push(requirement);
            }
          });

          if (requirementList.length > 0) {
            PrintMessage('Global package required:', MessageType.ERROR);
            requirementList.forEach((requirement) => {
              PrintMessage(`- ${requirement}`, MessageType.ERROR, 2);
            });
            return;
          }
        }

        if (filesystem.exists(appName)) {
          PrintMessage(
            `The "${appName}" folder already exists.`,
            MessageType.ERROR,
          );
          return;
        }

        try {
          PrintNewLine();

          PrintMessage('Creating App project structure...', MessageType.INFO);
          PrintDivider();

          // TODO: init, move files from technology, install deps
          const { files } = settings.template;
          let generators = [];

          generators = files.reduce((acc, file) => {
            const gen = template.generate({
              template: `${settings.template.path}/${file}`,
              target: `${appName}/${file.replace('.ejs', '')}`,
              props: {
                name: appName,
                pascalCaseName: pascalCaseAppName,
              },
            });

            return acc.concat([gen]);
          }, generators);

          await Promise.all(generators);

          const { dependencies } = settings.install;
          const { devDependencies } = settings.install;
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

          PrintNewLine();
          PrintMessage(
            'The project was created successfuly!',
            MessageType.SUCCESS,
          );
          PrintDivider();
          PrintNewLine();

          const manager = system.which('yarn') ? 'yarn' : 'npm run';

          PrintMessage(
            'We suggest that you begin by typing:',
            MessageType.DEFAULT,
          );
          PrintNewLine();
          PrintMessage(`$ cd ${appName}`, MessageType.DEFAULT, 2);
          PrintMessage(`$ ${manager} start`, MessageType.DEFAULT, 2);
          PrintNewLine();
          PrintDivider();
          return;
        } catch (err) {
          PrintMessage(err, MessageType.ERROR);
          return;
        }
      }
    }

    PrintMessage(HelpInfo.Message, MessageType.INFO);
    PrintNewLine();

    PrintMessage(HelpInfo.Technologies.Text, MessageType.DEFAULT);
    HelpInfo.Technologies.Rows.forEach((row) => {
      PrintMessage(row, MessageType.DEFAULT, 2);
    });
  }
}

module.exports = new CreateCommand();
