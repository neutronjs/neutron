/**
 * @typedef {import('gluegun').GluegunToolbox} GluegunToolbox
 */

const { TechnologyType, GetCurrentTechnology } = require('../utils/technology');

const {
  MessageType,
  PrintMessage,
  PrintDivider,
  PrintInvalidOperation,
  PrintNewLine,
} = require('../tools/terminal');

class HelpInfo {
  static get Message() {
    return 'Usage: neutron add:page <name>';
  }
}

class AddPageCommand {
  get name() {
    return 'add:page';
  }

  /**
   * @param {GluegunToolbox} toolbox
   */
  async run(toolbox) {
    const { parameters, template, filesystem, strings } = toolbox;

    if (!parameters.options.h && parameters.first) {
      const technologyType = GetCurrentTechnology();

      if (technologyType === TechnologyType.INVALID) {
        PrintInvalidOperation();
        return;
      }

      if (!parameters.first) {
        PrintMessage('The page name is not provided', MessageType.ERROR);
        return;
      }

      const name = strings.pascalCase(parameters.first);
      const path = `src/pages/${name}`;

      if (filesystem.exists(path)) {
        PrintMessage(`This page already exists: ${name}`, MessageType.ERROR);
        return;
      }

      const files = ['index.js.ejs', 'styles.js.ejs'];
      let generators = [];

      generators = files.reduce((acc, file) => {
        const gen = template.generate({
          template: `${technologyType}/add-page/${file}`,
          target: `${path}/${file.replace('.ejs', '')}`,
          props: { name },
        });
        return acc.concat([gen]);
      }, generators);

      PrintNewLine();

      PrintMessage(`Creating new files: "${path}" ...`, MessageType.INFO);

      await Promise.all(generators);

      PrintDivider();
      PrintMessage(
        'A new page was created! Please, add page reference into "src/routes/index.js".',
        MessageType.SUCCESS,
      );
      return;
    }

    PrintMessage(HelpInfo.Message, MessageType.INFO);
  }
}

module.exports = new AddPageCommand();
