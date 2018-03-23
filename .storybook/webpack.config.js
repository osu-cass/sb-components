// load the default config generator.
const genDefaultConfig = require("@storybook/react/dist/server/config/defaults/webpack.config.js");
const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env);

  // add typescript loader:
  config.module.rules.push({
    test: /\.(ts|tsx)?$/,
    use: {
      loader: "ts-loader",
      options: {
        configFile: path.join(__dirname, "tsconfig.json")
      }
    }
  });

  config.module.rules.push({
    test: /\.less$/,
    include: [path.resolve(__dirname, "..", "src", "Assets", "Styles")],
    use: ["style-loader", "css-loader?sourceMap", "less-loader?sourceMap"]
  });
  config.resolve = {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".less"],
    plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })]
  };

  return config;
};
