// load the default config generator.
const genDefaultConfig = require("@storybook/react/dist/server/config/defaults/webpack.config.js");
const path = require("path");

module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env);

  // add typescript loader:
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve("awesome-typescript-loader")
  });

  config.module.rules.push({
    test: /\.less$/,
    include: [path.resolve(__dirname, "../", "src/index", "Assets/Styles")],
    use: ["style-loader", "css-loader", "less-loader"]
  });

  config.resolve.alias = {
    src: path.resolve(__dirname, "../src"),
    mocks: path.resolve(__dirname, "../mocks"),
  }
  config.resolve.extensions.push(".ts", ".tsx", ".less");

  return config;
};
