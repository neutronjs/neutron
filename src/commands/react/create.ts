import { GluegunToolbox } from 'gluegun'
import { NeutronUtils } from '../../utils'

module.exports = {
  name: 'create',
  description: 'Create new react app with duck pattern',
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, filesystem, template, system }: GluegunToolbox = toolbox
    const { terminal, packageManager } = new NeutronUtils(toolbox)

    const appName = parameters.first

    if (!appName) {
      terminal.error('The app name is not provided')
      return
    }

    if (filesystem.exists(appName)) {
      terminal.error(`The "${appName}" folder already exists.`)
      return
    }

    try {
      terminal.info('Creating App project structure...')

      const files: string[] = [
        'public/favicon.ico.ejs',
        'public/index.html.ejs',
        'src/components/Hello/index.js.ejs',
        'src/components/Hello/styles.js.ejs',
        'src/config/reactotron.js.ejs',
        'src/pages/Home/index.js.ejs',
        'src/pages/Home/styles.js.ejs',
        'src/routes/history.js.ejs',
        'src/routes/index.js.ejs',
        'src/services/api.js.ejs',
        'src/store/index.js.ejs',
        'src/store/ducks/index.js.ejs',
        'src/store/sagas/index.js.ejs',
        'src/styles/colors.js.ejs',
        'src/styles/global.js.ejs',
        'src/utils/notification.js.ejs',
        'src/utils/storage.js.ejs',
        'src/App.js.ejs',
        'src/index.js.ejs',
        '.editorconfig.ejs',
        '.env.ejs',
        '.env.example.ejs',
        '.eslintrc.json.ejs',
        '.gitignore.ejs',
        'commitlint.config.js.ejs',
        'dockerfile.ejs',
        'package.json.ejs',
        'LICENSE.ejs',
        'README.md.ejs'
      ]

      let generators: Promise<string>[] = []

      generators = files.reduce((prev, file) => {
        const gen = template.generate({
          template: `react/create/${file}`,
          target: `${appName}/${file.replace('.ejs', '')}`,
          props: { name: appName }
        })
        return prev.concat([gen])
      }, generators)

      await Promise.all(generators)

      const { latest } = parameters.options

      if (latest) {
        try {
          const dependencies = [
            '@rocketseat/unform',
            'axios',
            'connected-react-router',
            'dotenv',
            'history',
            'lodash',
            'prop-types',
            'react',
            'react-dom',
            'react-redux',
            'react-router-dom',
            'react-scripts',
            'react-toastify',
            'reactotron-react-js',
            'reactotron-redux',
            'reactotron-redux-saga',
            'redux',
            'redux-saga',
            'redux-thunk',
            'reduxsauce',
            'seamless-immutable',
            'styled-components',
            'yup'
          ]

          const devDependencies = [
            '@commitlint/cli',
            '@commitlint/config-conventional',
            'eslint',
            'eslint-config-airbnb',
            'eslint-plugin-import',
            'eslint-plugin-jsx-a11y',
            'eslint-plugin-react',
            'eslint-plugin-react-hooks',
            'husky'
          ]

          terminal.info(await packageManager.install(dependencies, false))
          terminal.info(await packageManager.install(devDependencies, false))
        } catch (err) {
          terminal.error(err)
        }
      }

      terminal.success(`The project was created. Let's Code!`, true)

      terminal.success(`   $ cd ${appName}`)
      system.which('yarn')
        ? terminal.success(`   $ yarn install`, true)
        : terminal.success(`   $ npm install`, true)
    } catch (err) {
      terminal.error(err)
    }
  }
}
