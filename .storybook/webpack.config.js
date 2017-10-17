// load the default config generator.
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');

module.exports = (baseConfig, env) => {
    const config = genDefaultConfig(baseConfig, env);
    {
        // add typescript loader:
        config.module.rules.push({
            test: /\.(ts|tsx)$/,
            loader: require.resolve('awesome-typescript-loader')
        });

        // // generate typings for css modules
        // config.module.rules.push({
        //     test: /\.css$/,
        //     use: [
        //         'style-loader',
        //         {
        //           loader: 'typings-for-css-modules-loader',
        //           options: {
        //             modules: true,
        //             namedExport: true,

        //           }
        //         }
        //       ]
        // })

        config.resolve.extensions.push('.ts', '.tsx');

        return config;
    }
};