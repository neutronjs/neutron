import { GluegunToolbox } from 'gluegun'
import { NeutronUtils } from '../../utils'

module.exports = {
  name: 'add:component',
  description: 'Add new component files',
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, template, filesystem, strings } = toolbox
    const { terminal } = new NeutronUtils(toolbox)

    if (!parameters.first) {
      terminal.error(`The component name is not provided`)
      return
    }

    const name = strings.pascalCase(parameters.first)
    const path = `src/components/${name}`

    if (filesystem.exists(path)) {
      terminal.error(`This component already exists: ${name}`)
      return
    }

    const files: string[] = ['index.js.ejs', 'styles.js.ejs']

    let generators: Promise<string>[] = []

    generators = files.reduce((prev, file) => {
      const gen = template.generate({
        template: `react/add-component/${file}`,
        target: `${path}/${file.replace('.ejs', '')}`,
        props: { name }
      })
      return prev.concat([gen])
    }, generators)

    await Promise.all(generators)

    terminal.info(`Creating new component: "${path}" ...`)
    terminal.success('A new component was created!')
  }
}
