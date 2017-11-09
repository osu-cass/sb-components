# Smarter Balanced Components
> For use in Smarter Balanced

Make sure you have the latest version of Node.js and npm.

## Contributing

Before you push to this repository you must run the following commands:
- `npm run test` to run snapshot tests (do this before you check in changes).
If ANY of the snapshot tests fail, inspect the failures and verify that they are expected failures, then run;
- `npm run test -- -u` to update snapshot tests with new results (commit the *.snap* files).
- `npm run prettier` to autoformat the entire `src/` directory to enforce consistent code formatting

### Other Commands
- `npm install` to setup development environment.
- `npm run storybook` to launch the live demo.
