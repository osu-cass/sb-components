import initStoryshots from "@storybook/addon-storyshots";

// Note: Storyshots doesnt not use JsDom causing some tests to fail.
// The following regex will run all storyShot tests except for the ones specified.
initStoryshots({
  storyKindRegex: /^((?!.*?(Item Table Container|Filter Link|Search Result Container)).)*$/
});
