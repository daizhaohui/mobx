const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
//const argv = require("yargs").argv;
const appName = process.env.AppName;

console.log("process.env.appName:" + appName);

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "../src/" + appName + "/index.js"),
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/index.html")
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    compress: true,
    port: 8081,
    open: "Google Chrome",
    hot: true
  },
  devtool: "source-map"
};
