const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "widgets/widget.ts"),
  mode: "development",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "widget.js",
    library: "__source__",
    libraryTarget: "window",
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: "vendor",
          chunks: "all",
        },
      },
    },
  },
};
