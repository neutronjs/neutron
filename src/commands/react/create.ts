import { GluegunToolbox } from 'gluegun'
import { NeutronUtils } from '../../utils'

module.exports = {
  name: 'create',
  description: 'Create new app using create-react-app with Duck Pattern',
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, filesystem, system, template }: GluegunToolbox = toolbox
    const { terminal, nodeModule, packageManager } = new NeutronUtils(toolbox)

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
      terminal.info('Create React App is running...')

      await nodeModule.run('create-react-app', appName)

      terminal.success('Project was created!', true)
      terminal.info(`Installing dependencies...`)

      terminal.info(
        await packageManager.install(
          [
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
          ],
          false
        )
      )

      terminal.success('Dependencies: OK!', true)
      terminal.info(`Installing 'dev' dependencies...`)

      terminal.info(
        await packageManager.install(
          [
            '@commitlint/cli',
            '@commitlint/config-conventional',
            'eslint',
            'eslint-config-airbnb',
            'eslint-plugin-import',
            'eslint-plugin-jsx-a11y',
            'eslint-plugin-react',
            'eslint-plugin-react-hooks',
            'husky'
          ],
          true
        )
      )

      terminal.success('Dev Dependencies: OK!', true)
      terminal.info('Configuring Duck Pattern...')

      await filesystem.removeAsync(filesystem.path(appName, '.git'))
      await filesystem.removeAsync(filesystem.path(appName, 'public'))
      await filesystem.removeAsync(filesystem.path(appName, 'src'))

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
        'LICENSE.ejs',
        'README.md.ejs'
      ]

      let generators: Promise<string>[] = []

      generators = files.reduce((prev, file) => {
        const gen = template.generate({
          template: `react/create/${file}`,
          target: `${appName}/${file.replace('.ejs', '')}`
        })
        return prev.concat([gen])
      }, generators)

      await Promise.all(generators)

      if (system.which('git')) {
        terminal.info(await system.run(`cd ${appName} && git init`))
      }

      if (system.which('code')) {
        await system.run(`code ${appName}/.`)
      }

      terminal.success(`Process completed successfully. Let's Code!`, true)
    } catch (err) {
      terminal.error(err)
    }
  }
}
