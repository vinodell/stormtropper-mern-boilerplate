const { resolve } = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESlintPlugin = require("eslint-webpack-plugin");

const config = {
  entry: "./client/main.js",
  mode: "development",
  output: {
    filename: "js/[name].bundle.js",
    path: resolve(__dirname, "dist"),
    publicPath: "/",
    //  publicPath пустая переменная
  },
  devServer: {
    hot: true,
    open: true,
    contentBase: resolve(__dirname, "dist"),
    port: 8080,
    host: "localhost",
    index: "index.html",
    overlay: {
      warnings: false,
      errors: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        use: "babel-loader",
        exclude: /node_modules/,
        // описания правил работы с jsx для JavaScript, к которому применим babel
      },
      {
        test: /\.(scss|css)$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, // выводит css файлы в отдельный файл (3)
            options: {
              publicPath: "../",
            },
          },
          "css-loader", // собирает все эти файлы в единые куски (2)
          "sass-loader", // sass преобразует это в css (1) *!webpack считывает код снизу вверх!
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ESlintPlugin({
      extensions: ["js", "jsx"],
    }),
    new MiniCssExtractPlugin({
      filename: "css/style.css",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${__dirname}/client/index.html`,
          to: "index.html",
          // to: относительно path: resolve(__dirname, 'dist'), то есть папки /dist
        },
      ],
    }),
  ],
};

module.exports = config;
