sed -i -e 's/\/assets/.\/assets/g' dist/styles.css
cp -R assets dist/
echo "Published finish into 'dist' folder"
