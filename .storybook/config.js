import { configure } from '@storybook/react';
import 'font-awesome/css/font-awesome.min.css';
import "@osu-cass/smarter-balanced-styles/styles/advanced-filter.less";
import "@osu-cass/smarter-balanced-styles/styles/basic-filter.less";

const req = require.context("../stories", true, /\.storybook\.tsx$/);


function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
