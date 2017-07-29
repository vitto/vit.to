'use strict'

const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const path = require('path')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const WebpackShellPlugin = require('webpack-shell-plugin')

const __dist = path.join(__dirname, '/assets')
const __images = path.join(__dirname, '/sass/default/img')
const __js = path.join(__dirname, '/js')
const __modules = path.join(__dirname, '/../node_modules')
const __sass = path.join(__dirname, '/sass/default')
const publicPath = path.join(__dirname, '../')
const basePath = '/'

module.exports = function (env) {
  return {
    entry: {
      'js/app': __js + '/main.js',
      'js/vendor': [
        __modules + '/jquery/dist/jquery.js',
        __modules + '/blazy/blazy.js',
        __modules + '/headroom.js/dist/headroom.js',
        __modules + '/timeago.js/dist/timeago.js', // __modules + '/timeago.js/timeago.locales.min.js'
        __modules + '/zooming/build/zooming.js'
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
      filename: '[name].js',
      sourceMapFilename: '[name].map'
    },
    devtool: 'cheap-module-source-map',
    watch: true,
    watchOptions: {
      poll: 500 // decrese the value if the watcher is slowly (value is in milliseconds)
    },
    module: {
      rules: [
        {
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
          test: /\.woff$/,
          loader: 'url-loader?mimetype=application/font-woff',
          options: {
            limit: 65000,
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
            name: __images + '/[name].[ext]',
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
        }, {
          test: require.resolve('headroom.js'),
          use: 'imports-loader?this=>window,define=>false,exports=>false'
        }
      ]
    },
    plugins: [
      new CopyWebpackPlugin([{
        from: __images,
        to: __dist + '/img'
      }]),
      new webpack.LoaderOptionsPlugin({
        options: {
          postcss: [autoprefixer()]
        }
      }),
      new ExtractTextPlugin('[name].css'),
      new ManifestPlugin({
        basePath: basePath
      }),
      new WebpackShellPlugin({
        onBuildExit: [
          'npm run source',
          'npm run twig'
        ]
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        Blazy: 'blazy',
        jQuery: 'jquery',
        // 'window.Headroom': 'headroom.js/dist/headroom.js',
        timeago: 'timeago.js',
        Zooming: 'zooming'
      })
    ],
    devServer: {
      contentBase: __dist,
      compress: true,
      port: 9000
    }
  }
}
