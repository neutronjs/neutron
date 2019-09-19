import { GluegunToolbox } from "gluegun";
import { GetCurrentPlatform, Platform } from "../settings";
import {
  MessageType,
  PrintMessage,
  PrintDivider,
  PrintInvalidOperation
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
      if (GetCurrentPlatform() === Platform.INVALID) {
        PrintInvalidOperation();
        return;
      }

      if (!parameters.first) {
        PrintMessage(`The saga name is not provided`, MessageType.ERROR);
        return;
      }

      const name = strings.pascalCase(parameters.first);
      const camelCaseName = strings.camelCase(parameters.first);

      const file = `src/store/sagas/${camelCaseName}.js`;

      if (filesystem.exists(file)) {
        PrintMessage(`This saga already exists: ${file}`, MessageType.ERROR);
        return;
      }

      PrintMessage(`Creating new saga: "${file}" ...`, MessageType.DEFAULT);

      await template.generate({
        template: "shared/add-saga/saga.js.ejs",
        target: file,
        props: { name, camelCaseName }
      });

      PrintDivider();
      PrintMessage(
        'A new saga was created! Please, add saga reference into "src/store/sagas/index.js":',
        MessageType.SUCCESS
      );

      PrintMessage(
        `import { ${name}Types } from '../ducks/${camelCaseName}';`,
        MessageType.DEFAULT,
        2
      );
      PrintMessage(
        `import { add${name}Request } from './${camelCaseName}';`,
        MessageType.DEFAULT,
        2
      );
      return;
    }

    PrintMessage(HelpInfo.Message, MessageType.INFO);
  }
}

export default new AddSagaCommand();
