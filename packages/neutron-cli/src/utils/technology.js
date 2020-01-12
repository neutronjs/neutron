const { filesystem } = require('gluegun');

/**
 * Technology enumerator
 */
class TechnologyType {
  static get INVALID() {
    return '';
  }

  static get REACT() {
    return 'react';
  }

  static get REACT_NATIVE() {
    return 'react-native';
  }
}

/**
 * Get current project technology
 */
function GetCurrentTechnology() {
  const packageJson = filesystem.read('./package.json', 'json');

  if (packageJson && packageJson.dependencies) {
    if (TechnologyType.REACT_NATIVE in packageJson.dependencies) {
      return TechnologyType.REACT_NATIVE;
    }
    if (TechnologyType.REACT in packageJson.dependencies) {
      return TechnologyType.REACT;
    }
  }
  return TechnologyType.INVALID;
}

module.exports = {
  TechnologyType,
  GetCurrentTechnology,
};
