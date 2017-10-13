var genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');
var path  = require('path')

module.exports = function (config, env) {
    var config = genDefaultConfig(config, env);

    config.module.rules.push({
        test: /\.tsx$/,
        loader: 'ts-loader'
    })
    config.module.rules.push({
        test: /\.ts$/,
        loader: 'ts-loader'
    })
    config.resolve.extensions.push(".tsx");
    config.resolve.extensions.push(".ts");
    
    ts: {
        configFileName: path.resolve(__dirname, '../tsconfig.json')
      }

    return config;
};