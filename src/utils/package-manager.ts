import { GluegunToolbox, GluegunSystem, GluegunParameters } from 'gluegun'

export default class PackageManager {
  private system: GluegunSystem
  private parameters: GluegunParameters

  constructor(toolbox: GluegunToolbox) {
    this.system = toolbox.system
    this.parameters = toolbox.parameters
  }

  public install = async (list: string[], isDev: Boolean): Promise<string> => {
    if (this.system.which('yarn')) {
      return this.yarn(list, isDev)
    }
    return this.npm(list, isDev)
  }

  private npm = async (list: string[], isDev: Boolean): Promise<string> => {
    const appName = this.parameters.first

    let command = `cd ${appName} && npm install ${list.join(' ')}`
    if (isDev) {
      command = `${command} --dev`
    }
    return this.system.run(command)
  }

  private yarn = async (list: string[], isDev: Boolean): Promise<string> => {
    const appName = this.parameters.first

    let command = `cd ${appName} && yarn add ${list.join(' ')}`
    if (isDev) {
      command = `${command} -D`
    }
    return this.system.run(command)
  }
}
