import { GluegunToolbox, GluegunPrint } from 'gluegun'

export default class Terminal {
  private print: GluegunPrint

  constructor(toolbox: GluegunToolbox) {
    this.print = toolbox.print
  }

  public info = (msg: string, newline: Boolean = false) => {
    this.print.info(msg)
    newline && this.print.newline()
  }

  public success = (msg: string, newline: Boolean = false) => {
    this.print.success(msg)
    newline && this.print.newline()
  }

  public error = (msg: string, newline: Boolean = false) => {
    this.print.error(msg)
    newline && this.print.newline()
  }
}
