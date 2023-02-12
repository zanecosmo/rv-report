const path = require("path");

module.exports = {
  watch: false,
  target: "electron-renderer",
  mode: "development",
  devtool: "inline-source-map",
  entry: "./src/renderer.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".ts", "js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  }
};