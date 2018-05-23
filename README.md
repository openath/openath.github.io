# openath.github.io
OpenTrack athletics database - main web site

# Built on Jekyll, Bootstrap 4 and Webpack.

Check scripts in package.json to get the site up and running locally using either yarn or npm.

All front end assets are in _assets folder, running `yarn run scaffold` will clear out _site/assets/ then copy image and font folders over from webpacks _assets folder.

To fire up the whole shebang run `yarn run start` – unfortunately webpack takes a while to do its thing as it is working in conjunction with both Jekyll and Browser-sync so you may have to refresh the page after the browser initially opens displaying "Cannot GET /". Once webpack and browser-sync finish up you should see the actual website at http://localhost:3000

Using webpack as it will let us integrate all the latest ES6 stuff – might need to look at optimising build speeds at some point.

Not actually using webpack.dev.js, webpack.prod.js and webpack.common.js at the moment, these are useful with webpack-merge. The `start ` script is only using the default webpack.config.js file at the moment. Something to configure later if deemed worthwhile.

