var webpack = require('webpack');
var autoprefixer = require('autoprefixer-core');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path');

module.exports = function getWebpackConfig(isProd) {
  var plugins = [
    new ExtractTextPlugin('style.css', {
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      title: 'Ramble On',
      description: 'A tweet linking thing that takes the effort out of posting longer status updates',
      author: 'Colin Gourlay',
      template: 'src/index.html',
      analytics: isProd ? 'UA-70451658-1' : null,
      inject: 'body'
    })
  ];

  if (isProd) {
    plugins.push(new webpack.optimize.UglifyJsPlugin());
  }

  return {
    entry: './src/index.js',

    output: {
      filename: 'index.js',
      path: path.resolve('./dist'),
      libraryTarget: 'umd'
    },

    module: {
      loaders: [
        { test: /vendor/, loader: 'file?name=[path][name].[ext]&context=src'},
        { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
        { test: /\.css$/, loader: ExtractTextPlugin.extract('style',
          'css?modules&importLoaders=1&localIdentName=' +
          (isProd ? '' : '[name]__[local]___') +
          '[hash:base64:5]!postcss') },
        { test: /\.svg$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
      ]
    },

    postcss: [
      autoprefixer
    ],

    resolve: {
      modulesDirectories: ['node_modules', 'components']
    },

    plugins: plugins
  };

};
