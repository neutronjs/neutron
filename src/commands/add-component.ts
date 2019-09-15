import { GluegunToolbox } from "gluegun";
import { GetCurrentPlatform, Platform, GetSettings } from "../settings";
import {
  MessageType,
  PrintMessage,
  PrintDivider,
  PrintInvalidOperation
} from "../tools/terminal";

class HelpInfo {
  static Message: string = "Usage: neutron add:component <name>";
}

class AddComponentCommand {
  public name: string = "add:component";

  public async run(toolbox: GluegunToolbox) {
    const { commandName, parameters, template, filesystem, strings } = toolbox;

    if (GetCurrentPlatform() === Platform.INVALID) {
      PrintInvalidOperation();
      return;
    }

    if (!parameters.options.h && parameters.first) {
      const settings = GetSettings(commandName);

      if (!parameters.first) {
        PrintMessage(`The component name is not provided`, MessageType.ERROR);
        return;
      }

      const name = strings.pascalCase(parameters.first);
      const path = `src/components/${name}`;

      if (filesystem.exists(path)) {
        PrintMessage(
          `This component already exists: ${name}`,
          MessageType.ERROR
        );
        return;
      }

      const files: string[] = settings.template.files;
      let generators: Promise<string>[] = [];

      generators = files.reduce((acc, file) => {
        const gen = template.generate({
          template: `${settings.template.path}/${file}`,
          target: `${path}/${file.replace(".ejs", "")}`,
          props: { name }
        });
        return acc.concat([gen]);
      }, generators);

      PrintMessage(
        `Creating new component: "${path}" ...`,
        MessageType.DEFAULT
      );

      await Promise.all(generators);

      PrintDivider();
      PrintMessage(`A new component was created!`, MessageType.SUCCESS);

      return;
    }

    PrintMessage(HelpInfo.Message, MessageType.INFO);
  }
}

export default new AddComponentCommand();
