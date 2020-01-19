########################################
## NEUTRON JS - CLI NPM DEPLOY SCRIPT ##
########################################

# CREATE .NPMRC FILE
NPMRC=.npmrc
echo "//registry.npmjs.org/:email=\${EMAIL}" > $NPMRC
echo "//registry.npmjs.org/:_authToken=\${NPM_TOKEN}" >> $NPMRC

if node -pe 'JSON.parse(process.argv[1]).version' "$(cat package.json)" | grep 'next'; then
  # NPM DEPLOY NEUTRON JS CLI WITH TAG
  npm publish packages/neutron-cli --tag next
else
  # NPM DEPLOY NEUTRON JS CLI
  npm publish packages/neutron-cli
fi

