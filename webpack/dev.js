const merge = require('webpack-merge');
const common = require('./common.js');
const webpack = require('webpack');
const path = require('path');

let arr = [];
let bundle;

for (let i = 0; i < common.length; i++) {
  let plugins = [];

  // if (i === 1 || i === 2) {
  if (i === 1) {
    try {
      // bundle = path.resolve(__dirname, `../dist/dll/${i === 1 ? 'react' : 'admin'}-map.json`);
      bundle = path.resolve(__dirname, `../dist/dll/react-map.json`);
    } catch (e) {
      bundle = '';
    }
    plugins.push(
      new webpack.DllReferencePlugin({
        manifest: bundle,
      })
    );
  }

  arr.push(
    merge(common[i], {
      mode: 'development',
      devtool: 'inline-source-map',
      plugins,
    })
  );
}

module.exports = arr;
