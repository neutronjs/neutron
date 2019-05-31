import { GluegunToolbox } from 'gluegun'
import { NeutronUtils } from '../../utils'

module.exports = {
  name: 'add:duck',
  description: 'Add new duck file',
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, template, filesystem, strings } = toolbox
    const { terminal } = new NeutronUtils(toolbox)

    if (!parameters.first) {
      terminal.error(`The duck name is not provided`)
      return
    }

    const name = strings.camelCase(parameters.first)
    const nameAsUpper = strings.upperCase(name)
    const file = `src/store/ducks/${name}.js`

    if (filesystem.exists(file)) {
      terminal.error(`This duck already exists: ${file}`)
      return
    }

    await template.generate({
      template: 'react/add-duck/duck.js.ejs',
      target: file,
      props: { name, nameAsUpper }
    })

    terminal.info(`Creating new duck: "${file}" ...`)
    terminal.success(
      'A new duck was created! Please, add duck reference into "src/store/ducks/index.js":'
    )

    terminal.info(`  import { reducer as ${name} } from './${name}';`)
  }
}
