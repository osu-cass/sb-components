## React-advanced-filter

To build before publishing to npm.
```
yarn install
```

Begin development evnvironment in Storybook.
```
yarn start
```

To run snapshot tests. Do this before you check in, because the tests are designed to fail when changes have been made to a component. [Storybook](https://storybook.js.org/basics/introduction/) is a UI dev environment where we can develop our components in different states. This serves a double purpose as visual unit tests for our ui and each storywe write is automatically generated into snapshot test by [Jest](https://facebook.github.io/jest/docs/en/getting-started.html#content)
```
yarn test
```

Don't forget to update the snapshot tests when you fix them and push the *.snap files to source control.
```
yarn test -- -u
```
