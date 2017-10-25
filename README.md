## React-advanced-filter
Make sure you have the latest version of node and npm `npm i -g npm@latest node@latest`.

To build vefore publishing to npm.
```
npm install
```

Begin development evnvironment.
```
npm run storybook
```

To run snapshot tests. (Do this before you check in changes)
```
npm run test
```

Don't forget to update the snapshot tests if the results of the test are expeccted, and push the *.snap files to source control.
```
npm run test -- -u
```
