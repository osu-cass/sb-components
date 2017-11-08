import * as React from 'react';
import { MemoryRouter } from 'react-router';


// helper component that centers our storybook stories on the screen
export const RouterDecorator = (storyFn: () => JSX.Element) => (
    <MemoryRouter initialEntries={['/']}>{storyFn()}</MemoryRouter>    
);

