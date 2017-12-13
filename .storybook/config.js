import { configure } from '@storybook/react';
import { addDecorator } from '@storybook/react';
import { withConsole } from '@storybook/addon-console';
import '../src/Assets/Styles/site.less';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'typeface-pt-sans-caption/index.css';
import 'typeface-pt-serif/index.css';
import 'typeface-pt-serif-caption/index.css';
import '../src/Assets/Styles/custom.less';

const req = require.context("../stories", true, /\.storybook\.tsx$/);
addDecorator((storyFn, context) => withConsole()(storyFn)(context));

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
