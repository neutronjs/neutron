import { GluegunToolbox } from "gluegun";
import { GetCurrentPlatform, Platform } from "../settings";
import {
  MessageType,
  PrintMessage,
  PrintDivider,
  PrintInvalidOperation,
  PrintNewLine
} from "../tools/terminal";

class HelpInfo {
  static Message: string = "Usage: neutron add:saga <name>";
}

class AddSagaCommand {
  public name: string = "add:saga";

  public async run(toolbox: GluegunToolbox) {
    const {
      parameters,
      template,
      filesystem,
      strings
    }: GluegunToolbox = toolbox;

    if (!parameters.options.h && parameters.first) {
      const currentPlatform = GetCurrentPlatform();

      if (currentPlatform === Platform.INVALID) {
        PrintInvalidOperation();
        return;
      }

      if (!parameters.first) {
        PrintMessage(`The saga name is not provided`, MessageType.ERROR);
        return;
      }

      const pascalCaseName = strings.pascalCase(parameters.first);
      const camelCaseName = strings.camelCase(parameters.first);
      const upperCaseName = strings.upperCase(pascalCaseName).replace(" ", "_");

      const sagaFileName = `src/store/sagas/${camelCaseName}.js`;
      const duckFileName = `src/store/ducks/${camelCaseName}.js`;

      if (filesystem.exists(sagaFileName)) {
        PrintMessage(
          `This saga already exists: ${sagaFileName}`,
          MessageType.ERROR
        );
        return;
      }

      PrintNewLine();

      PrintMessage(
        `Creating new saga: "${sagaFileName}" ...`,
        MessageType.INFO
      );

      await template.generate({
        template: "shared/add-saga/saga.js.ejs",
        target: sagaFileName,
        props: {
          isMobile: currentPlatform === Platform.MOBILE,
          pascalCaseName,
          camelCaseName
        }
      });

      PrintDivider();
      PrintMessage(
        'A new saga was created! Please, add saga reference into "src/store/sagas/index.js":',
        MessageType.SUCCESS
      );

      PrintMessage(
        `import { ${pascalCaseName}Types } from '../ducks/${camelCaseName}';`,
        MessageType.DEFAULT,
        2
      );
      PrintMessage(
        `import { get${pascalCaseName}Request } from './${camelCaseName}';`,
        MessageType.DEFAULT,
        2
      );

      PrintNewLine();

      if (filesystem.exists(duckFileName)) {
        PrintMessage(
          `This duck already exists: ${duckFileName}`,
          MessageType.LIGHTER
        );
        return;
      }

      PrintMessage(
        `Creating new duck: "${duckFileName}" ...`,
        MessageType.INFO
      );

      await template.generate({
        template: "shared/add-duck/duck.js.ejs",
        target: duckFileName,
        props: { pascalCaseName, upperCaseName }
      });

      PrintDivider();
      PrintMessage(
        'A new duck was created! Please, add duck reference into "src/store/ducks/index.js":',
        MessageType.SUCCESS
      );
      PrintMessage(
        `import { reducer as ${camelCaseName} } from './${camelCaseName}';`,
        MessageType.DEFAULT,
        2
      );
      return;
    }

    PrintMessage(HelpInfo.Message, MessageType.INFO);
  }
}

export default new AddSagaCommand();
