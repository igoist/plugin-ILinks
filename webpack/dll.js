const webpack = require('webpack');
const path = require('path');

const dllPath = path.join(path.resolve(__dirname, '../'), 'dist/dll');

module.exports = {
  // mode: 'production',
  mode: 'development',

  entry: {
    react: ['react', 'react-dom'],
  },

  output: {
    path: dllPath,
    filename: '[name].dll.js',
    library: '[name]_[hash]',
  },

  plugins: [
    new webpack.DllPlugin({
      name: '[name]_[hash]',
      path: path.join(dllPath, '[name]-map.json'),
    }),
  ],
};
