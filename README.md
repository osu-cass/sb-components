## React-advanced-filter

To build before publishing to npm.
```
yarn install
```

Begin development evnvironment.
```
yarn run storybook
```

To run snapshot tests. Do this before you check in, because the tests are designed to fail when changes have been made to a component.
```
yarn test
```

Don't forget to update the snapshot tests when you fix them and push the *.snap files to source control.
```
yarn test -- -u
```
