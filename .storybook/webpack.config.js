// load the default config generator.
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');
const path = require('path');

module.exports = (baseConfig, env) => {
    const config = genDefaultConfig(baseConfig, env);

    // add typescript loader:
    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        loader: require.resolve('awesome-typescript-loader')
    });

    config.module.rules.push({
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'less-loader' // compiles Less to CSS
          }
        ],
        include: [
          path.resolve(__dirname, '../', 'src', 'styles'),
          path.resolve(__dirname, '../', 'node_modules', '@osu-cass', 'smarter-balanced-styles', 'styles')
        ],
      });

    config.resolve.extensions.push('.ts', '.tsx', '.less');

    return config;
};