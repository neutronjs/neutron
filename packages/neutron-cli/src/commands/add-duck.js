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
    return 'Usage: neutron add:duck <name>';
  }
}

class AddDuckCommand {
  get name() {
    return 'add:duck';
  }

  /**
   * @param {GluegunToolbox} toolbox
   */
  async run(toolbox) {
    const { parameters, template, filesystem, strings } = toolbox;

    if (!parameters.options.h && parameters.first) {
      if (GetCurrentTechnology() === TechnologyType.INVALID) {
        PrintInvalidOperation();
        return;
      }

      if (!parameters.first) {
        PrintMessage('The duck name is not provided', MessageType.ERROR);
        return;
      }

      const camelCaseName = strings.camelCase(parameters.first);
      const pascalCaseName = strings.pascalCase(parameters.first);
      const file = `src/store/ducks/${camelCaseName}.js`;

      if (filesystem.exists(file)) {
        PrintMessage(`This duck already exists: ${file}`, MessageType.ERROR);
        return;
      }

      PrintNewLine();

      PrintMessage(`Creating new duck: "${file}" ...`, MessageType.INFO);

      await template.generate({
        template: 'shared/add-duck/duck.js.ejs',
        target: file,
        props: { camelCaseName, pascalCaseName },
      });

      PrintDivider();
      PrintMessage(
        'A new duck was created! Please, add duck reference into "src/store/ducks/index.js":',
        MessageType.SUCCESS,
      );
      PrintMessage(
        `import { reducer as ${camelCaseName} } from './${camelCaseName}';`,
        MessageType.DEFAULT,
        2,
      );

      return;
    }

    PrintMessage(HelpInfo.Message, MessageType.INFO);
  }
}

module.exports = new AddDuckCommand();
