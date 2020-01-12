/**
 * @typedef {import('gluegun').GluegunToolbox} GluegunToolbox
 */

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
    const { parameters, filesystem, system, startTemplateResolver } = toolbox;

    if (!parameters.options.h && parameters.first) {
      const { react, reactNative } = parameters.options;

      if (react !== reactNative) {
        const technologyType = react
          ? TechnologyType.REACT
          : TechnologyType.REACT_NATIVE;

        const { first: appName } = parameters;

        if (!appName) {
          PrintMessage('The app name is not provided', MessageType.ERROR);
          return;
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

          await startTemplateResolver(technologyType, appName);

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
