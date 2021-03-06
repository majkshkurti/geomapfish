const path = require('path');
const ls = require('ls');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const plugins = [];
const entry = {};

// The dev mode will be used for builds on local machine outside docker
const nodeEnv = process.env['NODE_ENV'] || 'development';
const dev = nodeEnv == 'development'
process.traceDeprecation = true;

for (const filename of ls(path.resolve(__dirname, '${package}_geoportal/static-ngeo/js/apps/*.html.ejs'))) {
  const name = filename.file.substr(0, filename.file.length - '.html.ejs'.length);
  entry[name] = '${package}/apps/Controller' + name + '.js';
  plugins.push(
    new HtmlWebpackPlugin({
      template: filename.full,
      inject: false,
      chunksSortMode: 'manual',
      filename: name + '.html',
      chunks: ['commons', name],
      vars: {
        entry_point: '${entry_point}',
       },
    })
  );
}

const babelPresets = [['@babel/preset-env',{
  "targets": {
    "browsers": ["last 2 versions", "Firefox ESR", "ie 11"],
  },
  "modules": false,
  "loose": true,
}]]

// Transform code to ES2015 and annotate injectable functions with an $inject array.
const projectRule = {
  test: /testgeomapfish_geoportal\/static-ngeo\/js\/.*\.js$/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: babelPresets,
      plugins: [
        '@babel/plugin-syntax-object-rest-spread',
        '@babel/plugin-transform-spread',
        '@camptocamp/babel-plugin-angularjs-annotate',
      ],
    }
  },
};

const rules = [
  projectRule,
];

const noDevServer = process.env['NO_DEV_SERVER'] == 'TRUE';
devServer = dev && !noDevServer;

console.log("Use dev mode: " + dev)
console.log("Use dev server mode: " + devServer)

module.exports = {
  output: {
    path: path.resolve(__dirname, 'testgeomapfish_geoportal/static-ngeo/build/'),
    publicPath: devServer ? '${entry_point}dev/' : '${entry_point}static-ngeo/UNUSED_CACHE_VERSION/build/'
  },
  entry: entry,
  module: {
    rules
  },
  plugins: plugins,
  resolve: {
    alias: {
      testgeomapfish: path.resolve(__dirname, 'testgeomapfish_geoportal/static-ngeo/js'),
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'commons',
    }
  },
};
