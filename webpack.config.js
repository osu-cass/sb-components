const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CheckerPlugin = require("awesome-typescript-loader").CheckerPlugin;
const bundleOutputDir = "./lib";

const libraryName = "sb-components";

module.exports = env => {
  const isDevBuild = !(env && env.prod);
  return [
    {
      stats: {
        modules: false
      },
      entry: {
        index: "./src/index.ts"
      },
      resolve: {
        alias : {
          src: path.resolve(__dirname, "src/index"), 
          mocks: path.resolve(__dirname, "mocks")
      },
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      },
      output: {
        path: path.join(__dirname, bundleOutputDir),
        filename: "[name].js",
        libraryTarget: "commonjs"
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            include: /src/,
            use: "ts-loader"
          },
          {
            test: /\.css$/,
            use: isDevBuild
              ? ["style-loader", "css-loader"]
              : ExtractTextPlugin.extract({
                  use: "css-loader?minimize"
                })
          },
          {
            test: /\.less$/,
            use: isDevBuild
              ? ["style-loader", "css-loader", "less-loader"]
              : ExtractTextPlugin.extract({
                  use: ["css-loader?minimize", "less-loader"]
                })
          },
          {
            test: /\.(png|jpg|gif)$/,
            use: [
              {
                loader: "file-loader",
                options: {
                  name: "/Assets/Images/[name].[ext]",
                  emitFile: false
                }
              }
            ]
          }
        ]
      },
      plugins: [new CheckerPlugin()].concat(
        isDevBuild
          ? [
              // Plugins that apply in development builds only
              new webpack.SourceMapDevToolPlugin({
                filename: "[file].map", // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(
                  bundleOutputDir,
                  "[resourcePath]"
                ) // Point sourcemap entries to the original file locations on disk
              })
            ]
          : [
              // Plugins that apply in production builds only
              new webpack.optimize.UglifyJsPlugin(),
              new ExtractTextPlugin(libraryName + ".css")
            ]
      )
    }
  ];
};
