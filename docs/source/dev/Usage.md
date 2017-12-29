# Using SB-Components
> dev guide for installing and running sb-components

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
- @sbac/SBAC-Global-UI-Kit

## Install sb-components using npm:
```
npm install --save @osu-cass/sb-components
```

## Typings
Included in lib

## Required Assets
> Copies images from sbac global to project public directory
Use webpack copy
```
npm install --save-dev copy-webpack-plugin
```
Webpack config:
```
new CopyWebpackPlugin([
    {
        from: path.join(__dirname, 'node_modules', '@sbac/sbac-ui-kit/src/images/'),
        to: path.join(__dirname, 'public', 'Assets/Images')
    }
])
```
## Required Less
> In order to use the sbac global style sheet, use a less file to bundle peer dependencies bootstrap, font-awesome, sbac-ui, and this project
- See example in Assets/Styles/bundle.less
- Sbac-ui uses default bootstrap constants and can be overwritten during this step

Create a less file
```less
//** bundle.less
//## Peers
@import "~bootstrap/less/bootstrap.less";
@import "~font-awesome/less/font-awesome.less";
@import "~@sbac/sbac-ui-kit/src/less/sbac-ui-kit.less";
@import "~@osu-cass/sb-components/lib/Assets/Styles/sb-components.less";

//## Custom Styles
{your styles here}
```