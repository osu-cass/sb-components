[![npm version](https://badge.fury.io/js/%40osu-cass%2Fsb-components.svg)](https://badge.fury.io/js/%40osu-cass%2Fsb-components)
[![Build Status](https://travis-ci.org/osu-cass/sb-components.svg?branch=master)](https://travis-ci.org/osu-cass/sb-components)
[![Documentation Status](https://readthedocs.org/projects/sb-components/badge/?version=latest)](http://sb-components.readthedocs.io/en/latest/?badge=latest)
[![Coverage Status](https://coveralls.io/repos/github/osu-cass/sb-components/badge.svg?branch=feat%2Ftslint-config)](https://coveralls.io/github/osu-cass/sb-components?branch=feat%2Ftslint-config)

# Smarter Balanced Components

> For use in Smarter Balanced

Make sure you have the latest version of Node.js and npm.

## Getting Started

### Install peer dependencies
- react
- react-dom
- bootstrap
- jquery
- react-modal
- font-awesome
- typeface-pt-sans-caption
- typeface-pt-serif
- type-pt-serif-caption

### Install sb-components using npm:
```
npm install --save @osu-cass/sb-components
```
### Typings
Included in lib

### Required Assets
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
## Scripts
- `npm install` to setup development environment.
- `npm run storybook` to launch the live demo.
- `npm run test` to run snapshot tests
- `npm run test:prod` to run tests with no cache
- `npm run test -- -u` to update snapshot tests with new results (commit the *.snap* files).
- `npm run storybook-publish` to publish storybook to gh-site/storybook
- `npm run tsdoc-publish` to publish TypeScript docs to gh-site/tsdoc
- `npm run prepare` to determine if a npm publish would succeed
- `npm run webpack` to run dev webpack outputs to lib
- `npm run webpack:prod` to run production webpack outputs to lib

## Contribute
* [Fork It](https://help.github.com/articles/fork-a-repo/)
* [Submit Pull Request](https://help.github.com/articles/about-pull-requests/)

## Links
- [gh-pages](https://osu-cass.github.io/sb-components/)
- [npm](https://www.npmjs.com/package/@osu-cass/sb-components)
