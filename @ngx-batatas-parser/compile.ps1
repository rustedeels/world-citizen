rm -Force -Recurse dist/*
mkdir dist
cp package.json dist/
cp index.ts dist/
cp version.ts dist/
cp src dist/ -Recurse
