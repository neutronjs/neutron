import { system } from "gluegun";
import * as execSh from "exec-sh";

export class PackageManager {
  public install = async (
    appName: string,
    list: string[],
    isDev: Boolean
  ): Promise<string> => {
    if (system.which("yarn")) {
      return this.yarn(appName, list, isDev);
    }
    return this.npm(appName, list, isDev);
  };

  private npm = async (
    appName: string,
    list: string[],
    isDev: Boolean
  ): Promise<string> => {
    let command = `cd ${appName} && npm install ${list.join(" ")}`;
    if (isDev) {
      command = `${command} --dev`;
    }

    return execSh.promise(command);
  };

  private yarn = async (
    appName: string,
    list: string[],
    isDev: Boolean
  ): Promise<string> => {
    let command = `cd ${appName} && yarn add ${list.join(" ")}`;
    if (isDev) {
      command = `${command} -D`;
    }

    return execSh.promise(command);
  };
}
