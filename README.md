[![npm version](https://badge.fury.io/js/%40osu-cass%2Fsb-components.svg)](https://badge.fury.io/js/%40osu-cass%2Fsb-components)
[![Build Status](https://travis-ci.org/osu-cass/sb-components.svg?branch=master)](https://travis-ci.org/osu-cass/sb-components)
[![Documentation Status](https://readthedocs.org/projects/sb-components/badge/?version=latest)](http://sb-components.readthedocs.io/en/latest/?badge=latest)

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

## Links
- [gh-pages](https://osu-cass.github.io/sb-components/)
- [npm](https://www.npmjs.com/package/@osu-cass/sb-components)
