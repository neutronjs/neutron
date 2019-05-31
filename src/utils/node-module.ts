import { GluegunToolbox } from 'gluegun'

export default class NodeModule {
  constructor(private toolbox: GluegunToolbox) {}

  public run = async (module: string, params: string): Promise<string> => {
    const { system, filesystem } = this.toolbox

    const nodeNodules = filesystem.path(__dirname, '..', '..', 'node_modules')

    const modulePath = filesystem.path(nodeNodules, '.bin', `${module}`)

    return system.run(`node ${modulePath} ${params}`)
  }
}
