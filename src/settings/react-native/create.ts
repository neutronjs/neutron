export default {
  template: {
    path: "react-native/create",
    files: [
      ".expo-shared/assets.json.ejs",
      "assets/icon.png.ejs",
      "assets/splash.png.ejs",
      "src/components/Hello/index.js.ejs",
      "src/components/Hello/styles.js.ejs",
      "src/pages/Main/index.js.ejs",
      "src/pages/Main/styles.js.ejs",
      "src/services/api.js.ejs",
      "src/store/ducks/index.js.ejs",
      "src/store/sagas/index.js.ejs",
      "src/store/index.js.ejs",
      "src/styles/colors.js.ejs",
      "src/styles/index.js.ejs",
      "src/styles/metrics.js.ejs",
      "src/utils/storage.js.ejs",
      "src/index.js.ejs",
      "src/routes.js.ejs",
      ".editorconfig.ejs",
      ".eslintrc.json.ejs",
      ".gitignore.ejs",
      ".watchmanconfig.ejs",
      "App.js.ejs",
      "app.json.ejs",
      "babel.config.js.ejs",
      "jsconfig.json.ejs",
      "LICENSE.ejs",
      "package.json.ejs",
      "README.md.ejs"
    ]
  },
  requirements: ["expo-cli"],
  install: {
    dependencies: [
      "axios",
      "expo",
      "prop-types",
      "react",
      "react-dom",
      "https://github.com/expo/react-native/archive/sdk-35.0.0.tar.gz",
      "react-native-gesture-handler@~1.3.0",
      "react-native-web",
      "react-navigation",
      "react-redux",
      "redux",
      "redux-saga",
      "reduxsauce",
      "seamless-immutable",
      "styled-components"
    ],
    devDependencies: [
      "babel-eslint",
      "babel-plugin-root-import",
      "babel-preset-expo",
      "eslint",
      "eslint-config-airbnb",
      "eslint-import-resolver-babel-plugin-root-import",
      "eslint-plugin-import",
      "eslint-plugin-jsx-a11y",
      "eslint-plugin-react",
      "eslint-plugin-react-native"
    ]
  }
};
