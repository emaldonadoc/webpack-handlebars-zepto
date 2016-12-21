module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    files: [
      { pattern: 'tests.webpack.js', watched: false },
    ],
    frameworks: ['jasmine'],
    preprocessors: {
      'tests.webpack.js': ['webpack'],
    },
    reporters: ['dots'],
    singleRun: true,
    webpack: {
      module: {
        loaders: [
          {
            test: /\.js?$/,
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
            test: /\.css$/,
            loader: "css-loader" ,
          }
        ],
      },
      watch: true,
    },
    webpackServer: {
      noInfo: true,
    },
  });
};
