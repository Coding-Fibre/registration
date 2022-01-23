#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

git init -b main
git checkout -b main
git add -A
git commit -m 'Deployment'

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push origin gh-pages
git push -f git@github.com:Coding-Fibre/registration.git main:gh-pages

cd -