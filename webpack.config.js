const path = require("path");

module.exports = {
  watch: false,
  target: "electron-renderer",
  mode: "development",
  devtool: "inline-source-map",
  entry: "./src/electron/renderer.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
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