module.exports = {
  context: __dirname + "/app",
  entry: {
    javascript: "./app.js",
    html: "./index.html",
  },
  output: {
    filename: "app.js",
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
        loader: "css-loader" ,
     }],
    }}
