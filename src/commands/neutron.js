/**
 * @typedef {import('gluegun').GluegunToolbox} GluegunToolbox
 */

const { version } = require('../../package.json');

const {
  MessageType,
  PrintMessage,
  PrintDivider,
  PrintNewLine,
} = require('../tools/terminal');

class NeutronInfo {
  static get Header() {
    return {
      Title: [
        String.raw` _   _            _                       _ ____  `,
        String.raw`|:\ | | ___ _   _|:|_ _ __ ___  _ __     | /:___| `,
        String.raw`|  \| |/ _ \ | | | __| '__/ _ \| '_ \ _  | \___ \ `,
        String.raw`| |\  |  __/ |_| | |_| | | (_) | | | |:|_| |___) |`,
        String.raw`|_| \_|\___|\__,_|\__|_|  \___/|_| |_|\___/|____/ `,
      ],
      SubTitle: `Create & speed up your react project - CLI v${version}`,
    };
  }

  static get HelpInfo() {
    return {
      StartsWith: {
        Text: 'Starts With:',
        Rows: ['neutron create           Create new project with React'],
      },
      Commands: {
        Text: 'Commands:',
        Rows: [
          'neutron add:component    Add new component files',
          'neutron add:duck         Add new duck file',
          'neutron add:page         Add new page files',
          'neutron add:saga         Add new saga and duck files',
        ],
      },
      Utils: {
        Text: 'Utils:',
        Rows: [
          'neutron -h               Show help information',
          'neutron -v               Output the version number',
        ],
      },
    };
  }

  static get Footer() {
    return {
      Text: 'For more information:',
      Link: 'https://www.neutronjs.com',
    };
  }
}

class NeutronCommand {
  get name() {
    return 'neutron';
  }

  /**
   * @param {GluegunToolbox} toolbox
   */
  async run(toolbox) {
    const { parameters } = toolbox;
    const { Header, HelpInfo, Footer } = NeutronInfo;

    PrintNewLine();
    PrintDivider();
    Header.Title.forEach((line) => {
      PrintMessage(line, MessageType.DEFAULT);
    });
    PrintNewLine();
    PrintMessage(Header.SubTitle, MessageType.SUCCESS);
    PrintNewLine();
    PrintDivider();
    PrintNewLine();

    if (parameters.options.h) {
      const { StartsWith, Commands, Utils } = HelpInfo;

      PrintMessage(StartsWith.Text, MessageType.DEFAULT);
      StartsWith.Rows.forEach((line) => {
        PrintMessage(line, MessageType.DEFAULT, 2);
      });
      PrintNewLine();

      PrintMessage(Commands.Text, MessageType.DEFAULT);
      Commands.Rows.forEach((line) => {
        PrintMessage(line, MessageType.DEFAULT, 2);
      });
      PrintNewLine();

      PrintMessage(Utils.Text, MessageType.DEFAULT);
      Utils.Rows.forEach((line) => {
        PrintMessage(line, MessageType.DEFAULT, 2);
      });
      PrintNewLine();
      PrintDivider();
      PrintNewLine();
    }

    PrintMessage(Footer.Text, MessageType.DEFAULT);
    PrintMessage(Footer.Link, MessageType.INFO);
    PrintNewLine();
    PrintDivider();
  }
}

module.exports = new NeutronCommand();
