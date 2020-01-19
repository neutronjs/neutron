##########################################
## NEUTRON JS - RELEASE ASSETS COMPRESS ##
##########################################

# REMOVE TEMP DIR IF EXISTS
if [ -d temp ]; then
  rm -rf temp
fi

# CREATE OUTPUT DIR
mkdir -p temp/packages

# COMPRESS PACKAGES
for package in packages/*; do
  tar -czvf temp/$package.tar.gz $package
done
