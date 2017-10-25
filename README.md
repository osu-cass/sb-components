## React-advanced-filter
Make sure you have the latest version of node and npm `npm i -g npm@latest node@latest`.

To build before publishing to npm.
```
yarn install
```

Begin development evnvironment in Storybook. [Storybook](https://storybook.js.org/basics/introduction/) is a UI dev environment where we can develop our components in different states. This serves a double purpose as visual unit tests for our ui and each storywe write is automatically generated into snapshot test by [Jest](https://facebook.github.io/jest/docs/en/getting-started.html#content)
```
npm start
```

To run snapshot tests. Do this before you check in, because the tests are designed to fail when changes have been made to a component. 
```
npm test
```

Don't forget to update the snapshot tests if the results of the test are expeccted, and push the *.snap files to source control.
```
npm test -- -u
```
