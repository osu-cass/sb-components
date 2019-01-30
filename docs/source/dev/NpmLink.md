# Using NPM Link for Local Development
> When making edits to `sb-components` for a new project, the preferred way to develop the new code is to do it locally using `npm link`. 

> [Check out the `npm link` docs](https://docs.npmjs.com/cli/link.html)

## Setup
1. Run `npm link` within this project
2. Run `npm link @osu-cass/sb-components`

### AP_ItemSampler
> Steps for AP_ItemSampler

1. Follow npm link steps
2. Run `npm run watch` within this project
3. Any changes will be watched 
4. ItemSampler, has hot-loading and will reload from this project automatically

