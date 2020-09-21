const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: {
    background: "./background.js",
    content: "./content.js",
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: ["manifest.json", { from: "assets", to: "assets" }],
    }),
  ],
};
