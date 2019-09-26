import { GluegunToolbox } from "gluegun";
import { Platform, GetSettings } from "../settings";
import { PackageManager } from "../tools/package-manager";
import {
  MessageType,
  PrintMessage,
  PrintNewLine,
  PrintDivider
} from "../tools/terminal";

class HelpInfo {
  static Message: string = "Usage: neutron create <YourAppName> <platform>";
  static Options: any = {
    Text: "Platforms:",
    Rows: [
      "--web      New project with ReactJS",
      "--mobile   New project with React Native"
    ]
  };
}

class CreateCommand {
  public name: string = "create";

  public async run(toolbox: GluegunToolbox) {
    const {
      commandName,
      parameters,
      filesystem,
      template,
      system,
      strings
    } = toolbox;

    if (!parameters.options.h && parameters.first) {
      const { web, mobile } = parameters.options;

      if (web !== mobile) {
        const platformType = web ? Platform.WEB : Platform.MOBILE;
        const settings = GetSettings(commandName, platformType);
        const { first: appName } = parameters;
        const pascalCaseAppName = strings.pascalCase(appName);

        if (!appName) {
          PrintMessage("The app name is not provided", MessageType.ERROR);
          return;
        }

        if (Array.isArray(settings.requirements)) {
          const requirementList: Array<string> = [];

          settings.requirements.forEach(requirement => {
            if (!system.which(requirement)) {
              requirementList.push(requirement);
            }
          });

          if (requirementList.length > 0) {
            PrintMessage("Global package required:", MessageType.ERROR);
            requirementList.forEach(requirement => {
              PrintMessage(`- ${requirement}`, MessageType.ERROR, 2);
            });
            return;
          }
        }

        if (filesystem.exists(appName)) {
          PrintMessage(
            `The "${appName}" folder already exists.`,
            MessageType.ERROR
          );
          return;
        }

        try {
          PrintNewLine();

          PrintMessage("Creating App project structure...", MessageType.INFO);
          PrintDivider();

          const files: string[] = settings.template.files;
          let generators: Promise<string>[] = [];

          generators = files.reduce((acc, file) => {
            const gen = template.generate({
              template: `${settings.template.path}/${file}`,
              target: `${appName}/${file.replace(".ejs", "")}`,
              props: {
                name: appName,
                pascalCaseName: pascalCaseAppName
              }
            });

            return acc.concat([gen]);
          }, generators);

          await Promise.all(generators);

          const dependencies: string[] = settings.install.dependencies;
          const devDependencies: string[] = settings.install.devDependencies;
          const packageManager = new PackageManager();

          PrintNewLine();
          PrintMessage(
            "Installing packages required by your application in production...",
            MessageType.INFO
          );
          await packageManager.install(appName, dependencies, false);

          PrintNewLine();
          PrintMessage(
            "Installing packages that are only needed for local development and testing...",
            MessageType.INFO
          );
          await packageManager.install(appName, devDependencies, true);

          PrintNewLine();
          PrintMessage(
            "The project was created successfuly!",
            MessageType.SUCCESS
          );
          PrintDivider();
          PrintNewLine();

          const manager = system.which("yarn") ? "yarn" : "npm run";

          PrintMessage(
            "We suggest that you begin by typing:",
            MessageType.DEFAULT
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

    PrintMessage(HelpInfo.Options.Text, MessageType.DEFAULT);
    HelpInfo.Options.Rows.forEach(row => {
      PrintMessage(row, MessageType.DEFAULT, 2);
    });
  }
}

export default new CreateCommand();
