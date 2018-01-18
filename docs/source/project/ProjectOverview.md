# Project Overview

## Structure
- src
   - feature directories
      - tests, snapshots and functional tests
      - ts and tsx files
   - Assets
      - Styles
- mocks
   - feature directories
      - mock data ts
- stories
   - snapshots
   - features directories
      - tests (component ui tests)
- typings
   - custom typings
- lib (build output)
   - feature directories
      - typings
   - index.js (contains sb-component code)
   - index.d.ts (contains list of typings)
- gh-site
   - assets for github.io
   - storybuild (build output)
   - typedocs (build output)

### `src`
Includes all feature code to be shared with projects. Code is separated out in feature directories. Please see [styleguide](dev/StyleGuide). Jest is used for functional testing including snapshots. All mock data for testing needs to be placed in project root `mocks`.

### `mocks`
Includes all mock data for `src` and `stories`. 

### `stories`
Uses storybook component development kit. Run `npm run storybook` and launch `http://localhost:6006`. Each story will create a snapshot testing. All mock data should be placed in `mocks`. Storybook supports hot module reloading (HMR). 

### `typings`
Custom typings for the project. 

### `lib`
includes build output for ts/tsx code. `lib` only includes js, styles, and typings for external use. 

### `gh-site`
Root directory for the github.io pages. `tsdoc` and `storybook` build output. `tsdoc` includes all the project code level documentation auto generated from jsdoc format. 
