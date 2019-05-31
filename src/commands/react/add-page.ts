import { GluegunToolbox } from 'gluegun'
import { NeutronUtils } from '../../utils'

module.exports = {
  name: 'add:page',
  description: 'Add new page files',
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, template, filesystem, strings } = toolbox
    const { terminal } = new NeutronUtils(toolbox)

    if (!parameters.first) {
      terminal.error(`The page name is not provided`)
      return
    }

    const name = strings.pascalCase(parameters.first)
    const path = `src/pages/${name}`

    if (filesystem.exists(path)) {
      terminal.error(`This page already exists: ${name}`)
      return
    }

    const files: string[] = ['index.js.ejs', 'styles.js.ejs']

    let generators: Promise<string>[] = []

    generators = files.reduce((prev, file) => {
      const gen = template.generate({
        template: `react/add-page/${file}`,
        target: `${path}/${file.replace('.ejs', '')}`,
        props: { name }
      })
      return prev.concat([gen])
    }, generators)

    await Promise.all(generators)

    terminal.info(`Creating new files: "${path}" ...`)
    terminal.success(
      'A new page was created! Please, add page reference into "src/routes/index.js":'
    )

    terminal.info(`  import ${name} from '../pages/${name}';`)
    terminal.info('  ...')
    terminal.info(
      `  <Route path="/${name.toLowerCase()}" component={${name}} />`
    )
  }
}
