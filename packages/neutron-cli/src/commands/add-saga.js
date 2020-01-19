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
    return 'Usage: neutron add:saga <name>';
  }
}

class AddSagaCommand {
  get name() {
    return 'add:saga';
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
        PrintMessage('The saga name is not provided', MessageType.ERROR);
        return;
      }

      const camelCaseName = strings.camelCase(parameters.first);
      const pascalCaseName = strings.pascalCase(parameters.first);

      const sagaFileName = `src/store/sagas/${camelCaseName}.js`;
      const duckFileName = `src/store/ducks/${camelCaseName}.js`;

      if (filesystem.exists(sagaFileName)) {
        PrintMessage(
          `This saga already exists: ${sagaFileName}`,
          MessageType.ERROR,
        );
        return;
      }

      PrintNewLine();

      PrintMessage(
        `Creating new saga: "${sagaFileName}" ...`,
        MessageType.INFO,
      );

      await template.generate({
        template: 'shared/add-saga/saga.js.ejs',
        target: sagaFileName,
        props: {
          camelCaseName,
          pascalCaseName,
        },
      });

      PrintDivider();
      PrintMessage(
        'A new saga was created! Please, add saga reference into "src/store/sagas/index.js":',
        MessageType.SUCCESS,
      );

      PrintMessage(
        `import ${pascalCaseName}Actions from '@/store/ducks/${camelCaseName}';`,
        MessageType.DEFAULT,
        2,
      );
      PrintMessage(
        `import { get${pascalCaseName}Request } from './${camelCaseName}';`,
        MessageType.DEFAULT,
        2,
      );

      PrintNewLine();

      if (filesystem.exists(duckFileName)) {
        PrintMessage(
          `This duck already exists: ${duckFileName}`,
          MessageType.LIGHTER,
        );
        return;
      }

      PrintMessage(
        `Creating new duck: "${duckFileName}" ...`,
        MessageType.INFO,
      );

      await template.generate({
        template: 'shared/add-duck/duck.js.ejs',
        target: duckFileName,
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

module.exports = new AddSagaCommand();
