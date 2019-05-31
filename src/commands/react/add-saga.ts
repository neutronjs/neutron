import { GluegunToolbox } from 'gluegun'
import { NeutronUtils } from '../../utils'

module.exports = {
  name: 'add:saga',
  description: 'Add new saga file',
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, template, filesystem, strings } = toolbox
    const { terminal } = new NeutronUtils(toolbox)

    if (!parameters.first) {
      terminal.error(`The saga name is not provided`)
      return
    }

    const name = strings.camelCase(parameters.first)
    const nameAsPascal = strings.pascalCase(parameters.first)

    const file = `src/store/sagas/${name}.js`

    if (filesystem.exists(file)) {
      terminal.error(`This saga already exists: ${file}`)
      return
    }

    await template.generate({
      template: 'react/add-saga/saga.js.ejs',
      target: file,
      props: { name }
    })

    terminal.info(`Creating new saga: "${file}" ...`)
    terminal.success(
      'A new saga was created! Please, add saga reference into "src/store/sagas/index.js":'
    )

    terminal.info(`  import { ${nameAsPascal}Types } from '../ducks/${name}';`)
    terminal.info(`  import { add${nameAsPascal}Request } from './${name}';)`)
  }
}
