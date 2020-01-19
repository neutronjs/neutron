/**
 * NEUTRON JS - RELEASE ASSETS COMPRESS
 */
const fs = require('fs');
const tarPack = require('tar-pack');

const dirs = {
  PACKAGES: `${process.cwd()}/packages`,
  TEMP: `${process.cwd()}/temp`,
};

const packages = fs.readdirSync(dirs.PACKAGES);

if (fs.existsSync(dirs.TEMP)) {
  console.log('Removing temp dir.')
  fs.rmdirSync(dirs.TEMP, { recursive: true });
}

console.log('Creating temp dir.')
fs.mkdirSync(dirs.TEMP)

console.log('Compressing packages: tar.gz')
packages.forEach(package => {
  tarPack.pack(`${dirs.PACKAGES}/${package}/`)
    .pipe(fs.createWriteStream(`${dirs.TEMP}/${package}.tar.gz`))
});

console.log('Done!')
