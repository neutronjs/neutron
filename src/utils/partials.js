/**
 * Get partials data
 * @param {string} technology
 */
function GetPartials(technology) {
  return require(`../data/${technology}.partials.json`);
}

module.exports = { GetPartials };
