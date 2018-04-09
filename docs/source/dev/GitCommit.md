# How to Commit

```sh
# basic structure
type(optional scope): a message

# an example
feat: allow users to message each other directly

Users no longer have to communicate through public channels; user accounts are now treated as their own channels, so you can communicate with individuals directly.

Fixes #31

# also valid
chore(dependencies): add webpack and relevant loaders
```

Types are pre-defined, enforced values, while scopes are optional. You can checkout the [list of types with their descriptions](https://github.com/commitizen/conventional-commit-types/blob/master/index.json) for more information. commitlint will tell you the available options when you get them wrong, but it's up to you to know which one is the most relevant.