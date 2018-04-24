# Testing

## Running unit tests
- Update snapshots and run tests `npm test -- -u`
- Run tests without updating `npm run test`

## Checking code coverage
There is an html file that is generated when the test are run. Find this file:
 
 * Go to the directory that contains the project repository
 * Move to `\coverage\lcov-report`
 * Open `index.html` in a web browser

This will display line-by-line coverage of the current unit tests.

## Testing container components

* Import any mocked objects that are needed for the container props
* Create a wrapper using `mount`
* Check that components are rendered within the container using `toBeDefined()`
* Check that methods are invoked be creating an `instance` of the wrapper, call the method, check that state of the component
* Perform the above steps for various values of any variables that might be used
