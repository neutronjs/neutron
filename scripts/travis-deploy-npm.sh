########################################
## NEUTRON JS - CLI NPM DEPLOY SCRIPT ##
########################################

# CREATE .NPMRC FILE
NPMRC=.npmrc
echo "//registry.npmjs.org/:email=\${EMAIL}" > $NPMRC
echo "//registry.npmjs.org/:_authToken=\${NPM_TOKEN}" >> $NPMRC

# COPY FILES TO NEUTRON JS CLI
cp README.md packages/neutron-cli
cp LICENSE packages/neutron-cli

# NPM DEPLOY NEUTRON JS CLI
npm publish packages/neutron-cli
