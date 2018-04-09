# Publish, Branching and Versioning

## Versioning

> Semantic versioning

All versions in npm should also be github releases using tags. Tag names are the version number.

* Official builds use major.minor.patch
  * example: `v1.1.0`
* Pre-Release builds use major.minor.patch-alpha.x
  * example: `v1.2.1-alpha.3`

## Branching

* `master`, (default branch) contains current production code. Official builds and tags
* `hotfix`, immediate bug fixes, pre-release versions and tags. (hotfix => master)
  * example: `hotfix/1.2.1`
* `release`, pre-release versions and tags (release => master)
  * example: `release/1.3.0`
* `dev`, current dev code, (dev => release)
* `feature`, short-lived new feature code, (feature => dev)
  * example: `feature/acc-modal-style`

## Publish Npm Package

> builds to lib directory and used in the npm package

`webpack.config.js` has a dev, prod, and a watch command. Running webpack tasks outputs to the `lib` directory. There is a custom `tsconfig.webpack.json` to only include npm needed files and includes `src` directory.

### Publishing

1. Update `package.json` with the correct version {major.minor.patch}
2. Run `npm install` and commit `package.json` and `package.lock.json`
3. Run `npm run prepare` to verify the package before pushing.
4. Run `npm publish`, you may need to setup login creds
5. Tag version `git tag -a v{version}`
6. Push commit and push tags `git push` and `git push --tags`

### Local Dev

> Develop with npm link instead of pushing versions

* Follow [NpmLink](NpmLink)

## Continuous Integration, TravisCI

Travis will check code quality, conflicts, build, and tests. TODO: Linting support and NPM Publish

* Pull Request, determines if merge will succeed.
* Tags
  * TODO: soon to come, npm publish
* Branch build, runs for each commit
  * `master` will do a publish to github pages

## Pull Requests

All changes to master and dev should be a Pull Request. Master and Dev are protected to prevent accidental pushes. PR's should be code reviewed (1 person required) and pass checks (travis ci, codacy, coveralls...) before accepting a pull request.
