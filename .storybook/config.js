import { configure } from '@storybook/react';
import { addDecorator } from '@storybook/react';
import { withConsole } from '@storybook/addon-console';
import '../src/Styles/site.less';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../src/Styles/custom.less';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const req = require.context("../stories", true, /\.storybook\.tsx$/);
addDecorator((storyFn, context) => withConsole()(storyFn)(context));

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
