import { configure } from '@storybook/react';
import { addDecorator } from '@storybook/react';
import { withConsole } from '@storybook/addon-console';
import '../src/Assets/Styles/bundle.less';
import 'typeface-pt-sans-caption/index.css';
import 'typeface-pt-serif/index.css';
import 'typeface-pt-serif-caption/index.css';
import { checkA11y } from "@storybook/addon-a11y";


const req = require.context("../stories", true, /\.storybook\.tsx$/);
addDecorator((storyFn, context) => withConsole()(storyFn)(context));
addDecorator(checkA11y);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
