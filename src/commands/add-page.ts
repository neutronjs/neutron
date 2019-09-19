import { GluegunToolbox } from "gluegun";
import { GetCurrentPlatform, Platform, GetSettings } from "../settings";
import {
  MessageType,
  PrintMessage,
  PrintDivider,
  PrintInvalidOperation
} from "../tools/terminal";

class HelpInfo {
  static Message: string = "Usage: neutron add:page <name>";
}

class AddPageCommand {
  public name: string = "add:page";

  public async run(toolbox: GluegunToolbox) {
    const { commandName, parameters, template, filesystem, strings } = toolbox;

    if (!parameters.options.h && parameters.first) {
      if (GetCurrentPlatform() === Platform.INVALID) {
        PrintInvalidOperation();
        return;
      }

      const settings = GetSettings(commandName);

      if (!parameters.first) {
        PrintMessage(`The page name is not provided`, MessageType.ERROR);
        return;
      }

      const name = strings.pascalCase(parameters.first);
      const path = `src/pages/${name}`;

      if (filesystem.exists(path)) {
        PrintMessage(`This page already exists: ${name}`, MessageType.ERROR);
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

      PrintMessage(`Creating new files: "${path}" ...`, MessageType.DEFAULT);

      await Promise.all(generators);

      PrintDivider();
      PrintMessage(
        'A new page was created! Please, add page reference into "src/routes/index.js".',
        MessageType.SUCCESS
      );
      return;
    }

    PrintMessage(HelpInfo.Message, MessageType.INFO);
  }
}

export default new AddPageCommand();
