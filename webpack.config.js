// Add WebPack to use the included CommonsChunkPlugin
var webpack = require('webpack');
var libs = __dirname + '/libs/';

var config = {
   addVendor: function (name, path) {
    this.resolve.alias[name] = path;
    this.module.noParse.push(new RegExp('^' + name + '$'));
  },
  
  // We split the entry into two specific chunks. Our app and vendors. Vendors
  // specify that react should be part of that chunk
  entry: {
    app: ['webpack/hot/dev-server', './app/main.js'],
    vendors: ['react']
  },
  resolve: { alias: {} },
  
  // We add a plugin called CommonsChunkPlugin that will take the vendors chunk
  // and create a vendors.js file. As you can see the first argument matches the key
  // of the entry, "vendors"
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  ],
  output: {
    path: process.env.NODE_ENV === 'production' ? './dist' : './prod',
    filename: 'bundle.js'
  },
  module: {
    noParse: [],
    loaders: [
      { test: /\.js$/, loader: 'jsx-loader' },
      {
        test: /\.scss$/,
        loader: "style!css!sass?outputStyle=expanded&includePaths[]='./app/sass'"
      },
      { test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$/, loader: "file" }
    ]
  }
};

config.addVendor('react', libs + 'react/react.min.js');
//config.addVendor('bootstrap.css', libs + 'bootstrap/dist/css/bootstrap.min.css');
//config.addVendor('font-awesome.css', libs + 'font-awsome/font-awesome.min.css');

module.exports = config;