require('dotenv').config()

const { resolve } = require('path')

const ESlintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const autoprefixer = require('autoprefixer')
const { DefinePlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const { SOCKETS_IO_STATUS } = process.env

const config = {
  entry: './client/main.js',
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  output: {
    filename: 'assets/js/[name].bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader, // выводит css файлы в отдельный файл (3)
          {
            loader: 'css-loader',
            options: {
              url: false,
              importLoaders: 1,
              sourceMap: true
            }
          }, // собирает все эти файлы в единые куски (2)
          'postcss-loader',
          'sass-loader' // sass преобразует это в css (1) *!webpack считывает код снизу вверх!
        ]
      }
    ]
  },
  plugins: [
    // new LoaderOptionsPlugin({
    //   options: {
    //     context: __dirname,
    //     postcss: [autoprefixer]
    //   }
    // }),
    new ESlintPlugin({
      extensions: ['js', 'jsx'],
      exclude: 'node_modules'
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/style.css'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: 'client/index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'client/html.js',
          to: '[name][ext]'
        }
        // {
        //   from: 'client/assets/images',
        //   to: 'assets/images',
        //   noErrorOnMissing: true,
        //   globOptions: {
        //     dot: true,
        //     ignore: ['**/.gitkeep']
        //   }
        // },
        // {
        //   from: 'client/assets/fonts',
        //   to: 'assets/fonts',
        //   noErrorOnMissing: true,
        //   globOptions: {
        //     dot: true,
        //     ignore: ['**/.gitkeep']
        //   }
        // }
      ]
    }),
    new CleanWebpackPlugin(),
    new DefinePlugin({
      SOCKETS_IO_STATUS
    })
  ]
}

module.exports = config
