const path = require("path");

module.exports = {
  mode: "development",
  entry: "./index.ts",

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist",
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
      {
        test: /\.s(c|a)ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },

  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    compress: true,
  },

  resolve: {
    extensions: [".ts", ".js"],
  },

  target: ["web", "es6"],
};
