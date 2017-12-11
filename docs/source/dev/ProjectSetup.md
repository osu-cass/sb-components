# Project Setup

Make sure you have the latest version of Node.js and npm.
run `npm i` to install dependencies
run `npm run storybook` to start development server
## Development
### Storybook
Each component is developed independently of the DOM using storybook. You'll need to 
[write a .storybook file](https://storybook.js.org/basics/writing-stories/) to develop
 your component.

### Contributing
Before you push to this repository you must run the following commands:
- `npm run test` to run snapshot tests (do this before you check in changes).
If ANY of the snapshot tests fail, inspect the failures and verify that they are expected failures, then run;
- `npm run test -- -u` to update snapshot tests with new results (commit the *.snap* files).
- `npm run prettier` to autoformat the entire `src/` directory to enforce consistent code formatting

