const { system } = require('gluegun');
const exec = require('exec-sh');

class PackageManager {
  /**
   * @param {string} appName
   * @param {string[]} list
   * @param {Boolean} isDev
   */
  async install(appName, list, isDev) {
    if (system.which('yarn')) {
      return this.yarn(appName, list, isDev);
    }
    return this.npm(appName, list, isDev);
  }

  /**
   * @param {string} appName
   * @param {string[]} list
   * @param {Boolean} isDev
   */
  async npm(appName, list, isDev) {
    let command = `cd ${appName} && npm install ${list.join(' ')}`;
    if (isDev) {
      command = `${command} --dev`;
    }
    return exec.promise(command);
  }

  async yarn(appName, list, isDev) {
    let command = `cd ${appName} && yarn add ${list.join(' ')}`;
    if (isDev) {
      command = `${command} -D`;
    }
    return exec.promise(command);
  }
}

module.exports = { PackageManager };
