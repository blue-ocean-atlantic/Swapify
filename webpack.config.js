const path = require("path");

module.exports = {
  mode: "development",
  entry: "./client/src/index.js",
  output: {
    path: path.join(__dirname, 'client/dist'),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      }
    ]
  },
}