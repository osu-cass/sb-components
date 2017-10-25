## React-advanced-filter
Make sure you have the latest version of node and npm `npm i -g npm@latest node@latest`.

To build vefore publishing to npm.
```
yarn install
```

Begin development evnvironment.
```
npm start
```

To run snapshot tests. (Do this before you check in changes)
```
npm test
```

Don't forget to update the snapshot tests if the results of the test are expeccted, and push the *.snap files to source control.
```
npm test -- -u
```
