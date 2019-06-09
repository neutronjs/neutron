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

    const name = strings.pascalCase(parameters.first)
    const camelCaseName = strings.camelCase(parameters.first)

    const file = `src/store/sagas/${camelCaseName}.js`

    if (filesystem.exists(file)) {
      terminal.error(`This saga already exists: ${file}`)
      return
    }

    await template.generate({
      template: 'react/add-saga/saga.js.ejs',
      target: file,
      props: { name, camelCaseName }
    })

    terminal.info(`Creating new saga: "${file}" ...`)
    terminal.success(
      'A new saga was created! Please, add saga reference into "src/store/sagas/index.js":'
    )

    terminal.info(`  import { ${name}Types } from '../ducks/${camelCaseName}';`)
    terminal.info(`  import { add${name}Request } from './${camelCaseName}';)`)
  }
}
