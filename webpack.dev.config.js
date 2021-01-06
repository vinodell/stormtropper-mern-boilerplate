const { resolve } = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

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
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        // описания правил работы с jsx для JavaScript, к которому применим babel
      },
    ],
  },
  plugins: [
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
