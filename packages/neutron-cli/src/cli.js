const { build } = require('gluegun');

async function run(argv) {
  const cli = build()
    .brand('neutron')
    .src(__dirname)
    .plugins('./node_modules', { matching: 'neutron-*', hidden: true })
    .create();
  const toolbox = await cli.run(argv);

  return toolbox;
}

module.exports = { run };
