import { GluegunToolbox } from 'gluegun'

import { default as Terminal } from './terminal'
import { default as NodeModule } from './node-module'
import { default as PackageManager } from './package-manager'

export class NeutronUtils {
  public terminal: Terminal
  public nodeModule: NodeModule
  public packageManager: PackageManager

  constructor(toolbox: GluegunToolbox) {
    this.terminal = new Terminal(toolbox)
    this.nodeModule = new NodeModule(toolbox)
    this.packageManager = new PackageManager(toolbox)
  }
}
