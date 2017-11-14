import { configure } from '@storybook/react';
import 'font-awesome/css/font-awesome.min.css';
import '../src/Styles/site.less';

const req = require.context("../stories", true, /\.storybook\.tsx$/);


function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
