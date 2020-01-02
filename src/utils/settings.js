/**
 * Get partials data
 * @param {string} technology
 */
function GetSettings(technology) {
  return require(`../data/${technology}.settings.json`);
}

module.exports = { GetSettings };
