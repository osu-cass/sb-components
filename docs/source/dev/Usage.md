# Using SB-Components

## Install peer dependencies
- react
- react-dom
- bootstrap
- jquery
- react-modal
- font-awesome
- typeface-pt-sans-caption
- typeface-pt-serif
- type-pt-serif-caption

## Install sb-components using npm:
```
npm install --save @osu-cass/sb-components
```

## Typings
Included in lib

## Required Assets
Use webpack copy
```
npm install --save-dev copy-webpack-plugin
```
Webpack config:
```
new CopyWebpackPlugin([
    {
        from: path.join(__dirname, 'node_modules', '@osu-cass/sb-components/lib/Assets/Images'),
        to: path.join(__dirname, 'public', 'Assets/Images')
    }
])
```