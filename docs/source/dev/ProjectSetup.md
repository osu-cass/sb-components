# Project Setup

## Development Environment
- install node, npm included, [here](https://nodejs.org/en/)
- install vscode [here](https://code.visualstudio.com/) 
- Checkout [VsCode](VsCode) for extensions

## Cloning and Branching
1. Clone the project `git clone https://github.com/osu-cass/sb-components`
2. Checkout dev `git checkout dev`
3. Create a feature branch `git checkout -b feat/{your-branch-here}`
4. Create a PR!

## Setup
1. run `npm i` to install dependencies
2. run `npm run storybook` to start development server

## Development
### Storybook
Each component is developed independently of the DOM using storybook. You'll need to 
[write a .storybook file](https://storybook.js.org/basics/writing-stories/) to develop
 your component.

