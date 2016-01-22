var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: __dirname,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
      },
    ],
  },
  cache: true,
  devServer: {
    contentBase: "./public",
    noInfo: true,
    hot: false,
    inline: true,
    port: 3000,
  },
};

// Add optimization plugins when generating the final bundle
if (process.env.WEBPACK_ENV === 'production') {
  module.exports.plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unsafe: true,
        warnings: false,
      },
    }),
  ];
}
