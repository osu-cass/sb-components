const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const outDir = path.resolve(__dirname, "./lib");
const srcDir = path.resolve(__dirname, "./src");

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
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })]
      },
      output: {
        path: outDir,
        filename: "[name].js",
        libraryTarget: "commonjs"
      },
      externals: {
        jquery: "jquery",
        react: {
          root: "React",
          commonjs: "react"
        },
        "react-dom": {
          root: "ReactDOM",
          commonjs: "react-dom"
        },
        "font-awesome": "font-awesome",
        "react-modal": "react-modal",
        "react-router-dom": "react-router-dom",
        "react-router": "react-router"
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            include: srcDir,
            use: {
              loader: "ts-loader",
              options: {
                configFile: path.join(__dirname, "tsconfig.webpack.json")
              }
            }
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
            test: /\.(png|jpg|gif|svg)$/,
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
      plugins: [
        // Plugins that apply for all builds
        new CopyWebpackPlugin([
          {
            from: path.join(srcDir, "Assets"),
            to: path.join(outDir, "Assets")
          }
        ])
      ].concat(
        isDevBuild
          ? [
              // Plugins that apply in development builds only
              new webpack.SourceMapDevToolPlugin({
                filename: "[file].map", // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(outDir, "[resourcePath]") // Point sourcemap entries to the original file locations on disk
              })
            ]
          : [
              // Plugins that apply in production builds only
              new webpack.optimize.UglifyJsPlugin(),
              new ExtractTextPlugin("[name].css")
            ]
      )
    }
  ];
};
