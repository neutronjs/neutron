import { GluegunToolbox } from "gluegun";
import { GetCurrentPlatform, Platform } from "../settings";
import {
  MessageType,
  PrintMessage,
  PrintDivider,
  PrintInvalidOperation
} from "../tools/terminal";

class HelpInfo {
  static Message: string = "Usage: neutron add:duck <name>";
}

class AddDuckCommand {
  public name: string = "add:duck";

  public async run(toolbox: GluegunToolbox) {
    const {
      parameters,
      template,
      filesystem,
      strings
    }: GluegunToolbox = toolbox;

    if (GetCurrentPlatform() === Platform.INVALID) {
      PrintInvalidOperation();
      return;
    }

    if (!parameters.options.h && parameters.first) {
      if (!parameters.first) {
        PrintMessage(`The duck name is not provided`, MessageType.ERROR);
        return;
      }

      const pascalCaseName = strings.pascalCase(parameters.first);
      const camelCaseName = strings.camelCase(parameters.first);
      const upperCaseName = strings.upperCase(pascalCaseName).replace(" ", "_");
      const file = `src/store/ducks/${camelCaseName}.js`;

      if (filesystem.exists(file)) {
        PrintMessage(`This duck already exists: ${file}`, MessageType.ERROR);
        return;
      }

      PrintMessage(`Creating new duck: "${file}" ...`, MessageType.DEFAULT);

      await template.generate({
        template: "shared/add-duck/duck.js.ejs",
        target: file,
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

export default new AddDuckCommand();
