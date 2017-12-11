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

    config.module.rules.push(
      { test: /\.less$/,
        include: [
          path.resolve(__dirname, '../', 'src', 'Assets/Styles')
        ],
        use: ['style-loader', 'css-loader', 'less-loader']}
    )

    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000',
      include: [
        path.resolve(__dirname, '../', 'src', 'Images')
      ]
     });

    config.resolve.extensions.push('.ts', '.tsx', '.less');

    return config;
};