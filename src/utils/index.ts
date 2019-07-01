import { GluegunToolbox } from 'gluegun'

import { default as Terminal } from './terminal'
import { default as PackageManager } from './package-manager'

export class NeutronUtils {
  public terminal: Terminal
  public packageManager: PackageManager

  constructor(toolbox: GluegunToolbox) {
    this.terminal = new Terminal(toolbox)
    this.packageManager = new PackageManager(toolbox)
  }
}
