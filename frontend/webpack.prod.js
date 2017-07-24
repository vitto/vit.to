'use strict'

const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const path = require('path')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

const __dist = path.join(__dirname, '/assets')
const __images = path.join(__dirname, '/sass/default/img')
const __js = path.join(__dirname, '/js')
const __modules = path.join(__dirname, '/../node_modules')
const __sass = path.join(__dirname, '/sass/default')
const publicPath = '../'

module.exports = function (env) {
  return {
    entry: {
      'js/app': __js + '/main.js',
      'js/vendor': [
        __modules + '/jquery/dist/jquery.js'
      ],
      'css/style': [
        __sass + '/import.scss'
      ],
      'css/vendor-style': [
        __modules + '/material-design-icons/iconfont/material-icons.css'
      ]
    },
    output: {
      path: __dist,
      filename: '[name].[chunkhash].js',
      sourceMapFilename: '[name].[chunkhash].map'
    },
    devtool: 'source-map',
    watch: false,
    module: {
      rules: [{
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        }),
        exclude: __modules
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
        // exclude: __dirname + '/src'
      }, {
        test: /\.[ot]tf$/,
        loader: 'url-loader',
        options: {
          limit: 50000,
          name: './fonts/[name].[ext]',
          publicPath: publicPath
        }
      }, {
        test: /\.eot$/,
        loader: 'url-loader?mimetype=application/font-eot',
        options: {
          limit: 65000,
          name: './fonts/[name].[ext]',
          publicPath: publicPath
        }
      }, {
        test: /\.woff$/,
        loader: 'url-loader?mimetype=application/font-woff',
        options: {
          limit: 65000,
          name: './fonts/[name].[ext]',
          publicPath: publicPath
        }
      }, {
        test: /\.woff2$/,
        loader: 'url-loader?mimetype=application/font-woff2',
        options: {
          limit: 65000,
          name: './fonts/[name].[ext]',
          publicPath: publicPath
        }
      }, {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loader: 'file-loader',
        options: {
          name: './img/[name].[ext]',
          publicPath: publicPath
        }
      }, {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      }]
    },
    plugins: [
      new CopyWebpackPlugin([{
        from: __images,
        to: __dist + '/img'
      }]),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        options: {
          postcss: [autoprefixer()]
        }
      }),
      new ExtractTextPlugin('[name].[chunkhash].css'),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
          screw_ie8: true,
          keep_fnames: true
        },
        compress: {
          screw_ie8: true
        },
        comments: false
      }),
      new ManifestPlugin({
        basePath: 'build/'
      })
    ]
  }
}
