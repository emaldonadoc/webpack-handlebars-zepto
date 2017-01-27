var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpackUglifyJsPlugin = require('webpack-uglify-js-plugin');

module.exports = {
  context: __dirname + "/app",
  devServer: {
    inline:true,
    port: 8888
  },
  entry: {
    javascript: "./app.js",
    html: "./index.html",
  },
  output: {
    filename: "app.js",
    publicPath: '/',
    path: __dirname + "/dist",
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query:{
            presets:['es2015']
        }
      },
      {
        test: /\.hbs$/,
         loader: "handlebars-loader"
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
       },
       {
         test: /\.(jpe?g|gif|png)$/,
         loader: 'file-loader?emitFile=false&name=[path][name].[ext]'
       }]
   },
   plugins: [
        new ExtractTextPlugin("styles.css"),
        new webpackUglifyJsPlugin({
          cacheFolder:  'cache/',
          debug: true,
          minimize: true,
          sourceMap: false,
          output: {
            comments: false
          },
          compressor: {
            warnings: false
          }
        })
    ]
  }
