# openath.github.io
OpenTrack athletics database - main web site

# Built on Jekyll, Bootstrap 4 and Webpack.

First off

`bundle install`
`bundle update`

Check scripts in package.json to get the site up and running locally using either yarn or npm.

`yarn` install all node packages

All front end assets are in /__src/ folder and written to /dist/ folder by webpack, running `yarn run clean` will clear out /dist/ folder.

`yarn run start` to fire up local development mode

First load of http://localhost:3000 displays "Cannot GET /". Once Webpack and Browser-sync finish up you should see the actual website after a hard refresh.

We are using Webpack as it will let us integrate the latest ES6 modular code – might need to look at optimising build speeds at some point. Reloads while in dev are pretty slow atm as Jekyll can only reload assets after Webpack has generated the separate CSS file from SCSS using Webpack’s ExtractTextPlugin.

`yarn run build` to build production files
