# React Best Practices
A collection of best practice guidelines for ReactJS. Prepared by Rob Caldecott

## Contents
* [JavaScript](#javascript)
* [ESNext](#esnext)
* [prop-types](#prop-types)
* [Stateless Functional Components](#stateless-functional-components)
* [Containers](#containers)
* [Higher Order Components](#higher-order-components)
* [Functions as Children](#functions-as-children)
* [Events](#events)
* [Conditional Rendering](#conditional-rendering)
* [Arrays](#arrays)
* [Writing Components](#writing-components)
* [Unit Testing](#unit-testing)
* [State](#state)
* [Props](#props)
* [Pure Components](#pure-components)
* [Project Structure](#project-structure)
* [Summary](#summary)

## JavaScript
A collection of JavaScript tips.

### Stop using `var`
Use `const` and `let` instead. They have proper block scoping, unlike `var`s which are hoisted to the top of the function.

```js
let name = "John Doe";
name = "Someone else";
...
const name = "John Doe";
// This will fail
name = "Someone else";
```

### Use object shorthand notation

```js
state = { name: "" };

onChangeName = e => {
  const name = e.target.value;
  this.setState({ name });
  // this.setState({ name: name });
};
```

### Use string templates

```js
const name = "John Doe";
const greeting = `Hello ${name}, how are you?`;
```

## ESNext
You can take advantage of some next-generation JavaScript syntax right now, including:

* Async/await (ES7, ratified in June 2017)
  * Useful when using promises and `window.fetch`
* `Object` rest/spread (stage 3 proposal)
  * Destructure and make shallow copies of objects
* Class fields and `static` properties (stage 2 proposal)
  * Initialise component state
  * Auto-bound event handlers

### async/await
[![Edit Fetch!](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/9rnzgvMkY)

Simplify your promise handling.

#### Before

```js
const fetchIp = () => {
  window
    .fetch("https://api.ipify.org?format=json")
    .then(response => response.json())
    .then(({ ip }) => {
      // We're done, here in this handler
      this.setState({ ip });
    })
    .catch(({ message }) => {
      // Special catch handler syntax
      this.setState({ error: message })
    });
};
```

#### After

```js
const fetchIp = async () => {
  try {
    const response = await window.fetch("https://api.ipify.org?format=json");
    const { ip } = await response.json();
    // We're done: the code looks synchronous
    this.setState({ ip });
  } catch ({ message }) {
    // Standard try/catch
    this.setState({ error: message });
  }
};
```

### `Object` spread/rest
Use this to pull out useful properties from an object or make a shallow copy.

```js
const { text, show } = this.props;
const { text, ...other } = this.props;
const copy = { ...data, additional: "value" };
```

### Class fields and static properties
Make your React classes more readable:

```js
class MyComponent extends React.Component {
  state = { name: "" };

  onChangeName = e => {
    this.setState({ name: e.target.value });
  }
}
```

### Component class skeleton
A typical component class using ESNext syntax looks like this:

```js
class MyComponent extends React.Component {
  static propTypes = { ... };

  static defaultProps = { ... };

  state = { ... };

  onEvent = () => { ... };

  classMethod() { ... }
}
```

## prop-types
Always declare your props. Simply install the `prop-types` module from npm:

```bash
npm install --save prop-types
```

And then import the module into your component:

```js
import PropTypes from "prop-types";
```

Using prop types ensures:

* Consumers of your component can see exactly what props are supported.
* Console warning are displayed when the wrong prop type is used.
* Props can be documented for use with `react-styleguidist`.

### Example (class using ESNext static property support)
The following component supports two props: `onClick` which is a function and `name` which is a string and is a mandatory prop.

```js
import React from "react";
import PropTypes from "prop-types";

export default class Greeting extends React.Component {
  static propTypes = {
    onClick: PropTypes.func,
    name: PropTypes.string.isRequired
  };

  render() {
    return (
      <h1 onClick={this.props.onClick}>
        Hello, {this.props.name}
      </h1>
    );
  }
}
```

### Example (stateless functional component)
When using a stateless functional component you need to declare prop types on the function object itself:

```js
import React from "react";
import PropTypes from "prop-types";

const Greeting = props =>
  <h1 onClick={props.onClick}>
    Hello,{props.name}
  </h1>;

Greeting.propTypes = {
  onClick: PropTypes.func,
  name: PropTypes.string.isRequired
};

export default Greeting;
```

### Use destructuring to import specific prop types
You can also use destructuring to import just the prop types you need. This can save typing, especially when using props of the same type.

For example, here is the above stateless functional component example rewritten:

```js
import React from "react";
import { func, string } from "prop-types";

const Greeting = props =>
  <h1 onClick={props.onClick}>
    Hello,{props.name}
  </h1>;

Greeting.propTypes = {
  onClick: func,
  name: string.isRequired
};

export default Greeting;
```

### Using object shapes and arrays
You can also specify the *shape* of an object prop or the shape of arrays.

For example, the following component expects an array of objects.
Each object requires `id` and `name` string properties.

```js
import React from "react";
import { arrayOf, shape, string } from "prop-types";

const Stores = ({ stores }) =>
  <ul>
    {stores.map(store =>
      <li key={store.id}>
        {store.name}
      </li>
    )}
  </ul>;

Stores.propTypes = {
  stores: arrayOf(
    shape({
      id: string.isRequired,
      name: string.isRequired
    })
  )
};

export default Stores;
```

### Custom prop types: sharing your shapes
You can easily share custom prop types by adding them to a file and exporting them for use in your project. For example:

```js
// customProps.js
import { string, shape } from "prop-types";

export const store = shape({
  id: string.isRequired,
  name: string.isRequired
});

// Stores.js
import React from "react";
import { arrayOf } from "prop-types";
import { store } from "./customProps.js";

const Stores = ({ stores }) =>
  <ul>
    {stores.map(store =>
      <li key={store.id}>
        {store.name}
      </li>
    )}
  </ul>;

Stores.propTypes = {
  stores: arrayOf(stores).isRequired
};

export default Stores;
```

### Specifying default prop values
You can also declare default values for props by declaring the `defaultProps` object on the component class or function. For example:

```js
import React from "react";
import PropTypes from "prop-types";

export default class Heading extends React.Component {
  static propTypes = {
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
    children: PropTypes.node.isRequired
  };

  static defaultProps = {
    backgroundColor: "black",
    color: "white"
  };

  render() {
    const style = {
      backgroundColor: this.props.backgroundColor,
      color: this.props.color
    };

    return (
      <h1 style={style}>
        {this.props.children}
      </h1>
    );
  }
}
```

This can be especially useful for `func` props as it stops a potential crash if an optional function prop is not supplied. For example:

```js
import React from "react";
import { func } from "prop-types";

const Button = ({ onClick }) =>
  <div className="btn" onClick={onClick}>
    Button
  </div>;

Button.propTypes = {
  onClick: func
};

Button.defaultProps = {
  onClick: () => {}
};

export default Button;
```

#### Using default prop values in stateless functional components
Rather than declaring `defaultProps` for stateless functional components, you can use a combination of **destructuring** and **default parameter values** instead. For example:

```js
import React from "react";
import { string, node } from "prop-types";

const Heading = ({ children, backgroundColor = "black", color = "white" }) => {
  const style = {
    backgroundColor,
    color
  };

  return (
    <h1 style={style}>
      {children}
    </h1>
  );
};

Heading.propTypes = {
  backgroundColor: string,
  color: string,
  children: node.isRequired
};

export default Heading;
```

## Stateless Functional Components
Stateless functional components are React components as JavaScript functions. They can be used for components that do not use any lifecycle methods other than render and do not use any state.

* Concerned with *how things look*.
* AKA as *presentational* or *dumb* components.
* Functional programming paradigm: **stateless function components are pure functions of their props**.
* Props passed as the first function parameter.
* Simply return the component JSX: the same as the class `render` method.
* No state, no lifecycle methods.
* Easy to test.
* Easy to re-use/share.
* Make no assumptions about application state or the data source.
* Can be combined with container components (which may have state and may know about the data source).

### Example
A simple greeting component: it displays a name and calls a prop when clicked.

>Note that ES6 arrow functions are preferred.

```js
import React from "react";
import { func, string } from "prop-types";

const Greeting = ({ onClick, name }) =>
  <h1 onClick={onClick}>
    Hello, {name}
  </h1>;

Greeting.propTypes = {
  onClick: func,
  name: string.isRequired
};

export default Greeting;
```

### Simple snapshot testing
You can quickly test a simple component like this using **snapshot testing**. For example:

```js
import React from "react";
import renderer from "react-test-renderer";
import Greeting from "../Greeting";

it("renders", () => {
  expect(renderer.create(<Greeting name="The name" />)).toMatchSnapshot();
});
```
## Containers
Containers are combinations of *state* and *presentational components*.

* Concerned with *how things work*.
* Usually ES6 class components with state.
* Render Re-usable stateless functional components.
* Knowledge about the data source and/or the application state.
* Commonly used with `react-redux`.
* Often generated using *higher order components* (HOCs).

### Example
Here is a simple presentational component that renders a styled IP address:

```js
import React from "react";
import { string } from "prop-types";

const IPAddress = ({ ip }) => {
  const styles = {
    container: {
      textAlign: "center"
    },
    ip: {
      fontSize: "20px",
      fontWeight: "bold"
    }
  };
  return (
    <div style={styles.container}>
      <div style={styles.ip}>
        {ip}
      </div>
    </div>
  );
};

IPAddress.propTypes = {
  ip: string
};

export default IPAddress;
```

And here is an example container for this component. The container knows about the data source (in this case how to fetch the current IP.)

Notice the following characteristics:

* It is an ES6 class.
* It has state.
* It is using component lifecycle (`componentDidMount`).
* It is acting as a wrapper for the `IPAddress` component.

```js
import React from "react";
import IPAddress from "./IPAddress";

export default class IPAddressContainer extends React.Component {
  state = { ip: "" };

  componentDidMount() {
    window
      .fetch("https://api.ipify.org?format=json")
      .then(response => response.json())
      .then(response => {
        this.setState({ ip: response.ip });
      });
  }

  render() {
    return <IPAddress ip={this.state.ip} />;
  }
}
```

## Higher Order Components
Higher Order Components (or HOCs) are used to transform a component into another component.

[![Edit Higher Order Components](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/RBxmkgl0)

* A HOC **is a function that takes a component and returns a new component**.
* Made possible due to the compositional nature of React.
* Often used to inject additional props into an existing component.
* Useful for creating containers.
* A popular example is the `react-redux` `connect` function.
* Can be used to re-use code, hijack the `render` method and to manipulate existing props.

### Example: IP address
The following HOC function will fetch the IP address and inject a prop called `ip` into **any** component. This is an example of using a `class` as the container.

```js
import React from "react";

const withIPAddress = Component => {
  return class extends React.Component {
    state = { ip: "" };

    componentDidMount() {
      window
        .fetch("https://api.ipify.org?format=json")
        .then(response => response.json())
        .then(response => {
          this.setState({ ip: response.ip });
        });
    }

    render() {
      return <Component ip={this.state.ip} {...this.props} />;
    }
  };
};

export default withIPAddress;
```

Notice what's happening here: we are exporting a function that accepts a component as a parameter and returns an ES6 class.

To use this with an existing component we do something like this:

```js
import React from "react";
import { string } from "prop-types";
import withIPAddress from "./withIPAddress";

const SimpleIPAddress = ({ ip, color = "black" }) =>
  <p style={{ color }}>
    {ip}
  </p>;

SimpleIPAddress.propTypes = {
  ip: string
};

export default withIPAddress(SimpleIPAddress);
```

We export the result of calling `withIPAddress`, passing in the component in which we want the `ip` prop injected.

### Example: language
Here's another example of a HOC that injects the current browser language setting into any component as a prop called `language`. In this case we are using a stateless functional component as the container.

```js
// withLanguage.js
import React from 'react';

const withLanguage = Component => props =>
  <Component {...props} language={navigator.language} />;

export default withLanguage;

// MyComponent.js
import React from "react";
import { string } from "prop-types";
import withLanguage from "./withLanguage";

const MyComponent = ({ language }) =>
  <div>
    Browser language: {language}
  </div>;

MyComponent.propTypes = {
  language: string
};

export default withLanguage(MyComponent);
```

## Chaining HOCs
Note that you can also chain HOCs together to create a new component that combines them all. For example:

```js
import React from "react";
import { string } from "prop-types";
import withLanguage from "./withLanguage";
import withIPAddress from "./withIPAddress";

const MyComponent = ({ language, ip }) =>
  <div>
    <div>
      Browser language: {language}
    </div>
    <div>
      IP address: {ip}
    </div>
  </div>;

MyComponent.propTypes = {
  language: string,
  ip: string
};

export default withLanguage(withIPAddress(MyComponent));
```

## Functions as Children
[![Edit Functions as children](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/Q8DzMRVq)

An alternative pattern to HOCs is **functions as children** where you supply a function to call as the child of a container component: this is the equivalent of a **render callback**. Like HOCs you are decoupling your parent and child and it usually follows a similar pattern of a parent that has state you want to hide from the child.

This has some advantages over traditional HOCs:

* It does not pollute the `props` namespace. HOCs have an implicit contract they impose on the inner components which can cause prop name collisions especially when combining them with other HOCs.
* You do not need to use a function to create the container: you use simple composition instead.
* Developers do not need to call an HOC function to create a new wrapped component which can simplify the code: they simply export their child components as normal.

In order for this to work you need to use a function as the special `children` prop and have the outer container component call this function when rendering.

For example, here is a component that exposes the browser language:

```js
import React from 'react';
import { func } from 'prop-types';

const Language = ({ children }) =>
  <div>
    {children(navigator.language)}
  </div>;

Language.propTypes = {
  children: func,
};

export default Language;
```

The component simply treats the `children` prop as a function and calls it. It can be used like this:

```js
<Language>
  {language =>
    <p>
      Browser language: {language}
    </p>}
</Language>
```

The child node of `<Language>` is a function which returns the JSX to render.

Now let's imagine a component that calls an API and uses state to store the status, response and error.

```js
import React from 'react';
import { string, func } from 'prop-types';

export default class CallAPI extends React.Component {
  static propTypes = {
    api: string,
    children: func,
  };

  state = {
    isFetching: false,
    data: {},
    error: '',
  };

  async componentDidMount() {
    this.setState({ isFetching: true });
    try {
      const response = await fetch(this.props.api);
      const data = await response.json();
      this.setState({ isFetching: false, data });
    } catch ({ message }) {
      this.setState({ isFetching: false, error: message });
    }
  }

  render() {
    return (
      <div>
        {this.props.children({ ...this.state })}
      </div>
    );
  }
}
```

The component makes an API call (specified with a prop) and maintains the state of the call. It renders by calling a function and passing through a copy of the state as an object.

It could be used like this:

```js
<CallAPI api="https://api.ipify.org?format=json">
  {({ isFetching, data, error }) => {
    if (isFetching) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p>Error: {error}</p>;
    }
    return <p>Data: {JSON.stringify(data)}</p>;
  }}
</CallAPI>
```

And of course you can render normal components in the callback, for example:

```js
<CallAPI api="https://api.ipify.org?format=json">
{
  props => <MyComponent {...props} />
}
</CallAPI>
```

>There is a caveat to using this pattern: they cannot be optimised by React because **they change on every render** (a new function is declared on every render cycle). This rules out using `shouldComponentUpdate` and `React.PureComponent` which may lead to performance issues. Use this pattern wisely.

## Events
When using JavaScript DOM and `window` events we usually need `this` to point to our component instance.

Spot the bug in this code:

```js
import React from "react";

export default class BindBug extends React.Component {
  state = { toggled: false };

  onClick(e) {
    this.setState({ toggled: !this.state.toggled });
  }

  render() {
    const style = {
      fontSize: "36px",
      color: this.state.toggled ? "white" : "black",
      backgroundColor: this.state.toggled ? "red" : "yellow"
    };

    return (
      <div style={style} onClick={this.onClick}>
        Click me
      </div>
    );
  }
}
```

When you click on the `<div>` the `onClick` function handler is called which then tries to call `this.setState`. But the handler has not bound `this` to the component instance and it ends up as `null` which causes the code to crash.

### Binding events
[![Edit Event Binding](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/gJ6nymBE9)

To make this work we need to bind the `onClick` function to `this`. There are two ways to do this:

#### ESNext property initialize syntax (recommended)
The most readable way to do this is via an ESNext property initializer in conjunction with an arrow function. Arrow functions declared in this way are bound to `this` automatically:

```js
import React from "react";

export default class BindClassMethod extends React.Component {
  state = { toggled: false };

  onClick = e => {
    this.setState({ toggled: !this.state.toggled });
  };

  render() {
    const style = {
      fontSize: "36px",
      color: this.state.toggled ? "white" : "black",
      backgroundColor: this.state.toggled ? "red" : "yellow"
    };

    return (
      <div style={style} onClick={this.onClick}>
        Click me
      </div>
    );
  }
}
```

Notice the syntax used here:

```js
handlerName = (params) => { ... }
```

This is the best option: it is less code and even though this syntax is experimental it is used widely at Facebook.

Here's another example: a component that uses `window.setInterval` to update a counter every second:

```js
import React from "react";

export default class Timer extends React.Component {
  state = { counter: 0 };

  componentDidMount() {
    this.timerId = window.setInterval(this.onTimer, 1000);
  }

  componentWillUnmount() {
    window.clearInterval(this.timerId);
  }

  onTimer = () => {
    this.setState(prevState => ({ counter: prevState.counter + 1 }));
  };

  render() {
    return (
      <p>
        Counter: {this.state.counter}
      </p>
    );
  }
}
```

Note the following:

* The timer ID is stored so it can be cleared when the component unmounts.
* The function version of `setState` is used.

Alternatively you could use an inline arrow function: this will ensure `this` has the correct context:

```js
import React from "react";

export default class Timer extends React.Component {
  state = { counter: 0 };

  componentDidMount() {
    this.timerId = window.setInterval(() => {
      this.setState(prevState => ({ counter: prevState.counter + 1 }));
    }, 1000);
  }

  componentWillUnmount() {
    window.clearInterval(this.timerId);
  }

  render() {
    return (
      <p>
        Counter: {this.state.counter}
      </p>
    );
  }
}
```

#### Constructor binding
Another common way of binding is to add a constructor to your class and use `Function.prototype.bind`:

```js
import React from "react";

export default class BindConstructor extends React.Component {
  state = { toggled: false };

  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    this.setState({ toggled: !this.state.toggled });
  }

  render() {
    const style = {
      fontSize: "36px",
      color: this.state.toggled ? "white" : "black",
      backgroundColor: this.state.toggled ? "red" : "yellow"
    };

    return (
      <div style={style} onClick={this.onClick}>
        Click me
      </div>
    );
  }
}
```

Although this method is not relying on any experimental syntax it suffers from the following issues:

* It requires you adding a constructor.
* You have to remember call `super` in the constructor before doing anything else.
* It is more code.

### Sharing event handlers
[![Edit Shared Event Handlers](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vgAwR1Pxn)

Sometimes it is useful to share the share event handlers for your components and there is a simple trick to do this using the DOM `name` attribute (which is exposed as a prop for most React components):

```js
import React from "react";

export default class DetailsForm extends React.Component {
  state = {
    name: "",
    email: "",
    phone: ""
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div>
        <input name="name" value={this.state.name} onChange={this.onChange} />
        <input name="email" value={this.state.email} onChange={this.onChange} />
        <input name="phone" value={this.state.phone} onChange={this.onChange} />
      </div>
    )
  }
}
```

This takes advantage of the JavaScript **computed property name syntax** to update the state. Notice how the `name` prop for each `<input>` matches the corresponding state property: this allows us to share a single `onChange` handler with all three components.

>Although this looks like magic **it's just JavaScript**.

### Handling the ENTER key in a form
[![Edit Form ENTER key](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/RnpV11EV)

If you want to let users press the ENTER key to submit a form then you will need to prevent the default `submit` behaviour of a HTML form. For example:

```js
import React from "react";

export default class LoginForm extends React.Component {
  onSubmit = e => {
    // Don't actually submit!
    e.preventDefault();
    // Enter key was pressed
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={this.state.value}
          onChange={this.onChange}
        />
        <input
          name="password"
          type="password"
          value={this.state.password}
          onChange={this.onChange}
        />
        <input type="submit" value="Login" />
      </form>
    );
  }
}
```

This looks pretty much like a standard HTML form: the presence of the `<input type="submit" />` ensures the ENTER key works but by calling `preventDefault` on the submit event you can handle it yourself without the application reloading.

## Conditional Rendering
Sometimes it is useful to render components based on your props or state and there are at least five different mechanisms available to you (remember: it's just JavaScript!)

[![Edit Conditional Rendering](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/QgoRP307)

>Note that when you conditionally remove a component it **will be re-mounted when you put it back** which means `componentDidMount` and other lifecycle methods will be called again. So if you are, for example, fetching data when the component mounts, it will be called each time. To avoid this use some form of `show` prop and either return `null` from your `render` or use CSS to hide the content.

### Store the JSX in a variable
You can declare a variable to hold the JSX you wish to render. If your condition is not met and an `undefined` variable is rendered, then React will simply ignore it.

```js
let message;
if (someCondition) {
  message = <p>Hello, world!</p>;
}

return (
  <div>
    <p>Conditional rendering</p>
    {message}
  </div>
)
```

### Ternaries
You can also use a **ternary**. Using `null` or `undefined` is enough to stop anything being rendered:

```js
return (
  <div>
    <p>Conditional rendering</p>
    {someCondition ? <p>Hello, world!</p> : null}
  </div>
)
```

### Logical && operator shortcut
This relies on the fact the JavaScript will stop evaluating an && condition if the preceding checks return `false`.

```js
return (
  <div>
    <p>Conditional rendering</p>
    {someCondition && <p>Hello, world!</p>}
  </div>
)
```

So if `someCondition` is `true` then your JSX is rendered, but if it's `false` then your JSX will simply not be evaluated.

This is a very common method to conditionally render something in React.

### Return null from your render method
Another common pattern seen in some 3rd-party component libraries is to conditionally render a component based on a boolean prop. For example, you may have a prop called `show` that determines if the component should display at all: if not then your `render` method can simply return `null`.

>The advantage of this is that the component will not be mounted multiple times each time the `show` prop changes which is useful if you are fetching data, setting timers, etc. in `componentDidMount`.

```js
// MyComponent.js
const MyComponent = ({ show }) => {
  if (show) {
    return <p>Hello, world!</p>;
  }
  return null;
};

// SomeOtherComponent.js
...
return (
  <div>
    <p>Conditional rendering</p>
    <MyComponent show={someCondition} />
  </div>
)
```

### Hide your component using CSS
A final way is to simply use CSS to hide your component. This also has the advantage of keeping your component mounted.

```js
// MyComponent.js
const MyComponent = ({ show }) => {
  const style = {
    display: show ? "block" : "none"
  };

  return <p style={style}>Hello, world!</p>;
};

// SomeOtherComponent.js
...
return (
  <div>
    <p>Conditional rendering</p>
    <MyComponent show={someCondition} />
  </div>
)
```

## Arrays
When dealing with arrays of JavaScript objects you can use `Array.prototype.map` to map from array elements to React components. This is a very common pattern.

The following example shows a component that is rendering an array of stores by mapping each array entry to a new `<li>` component.

```js
import React from "react";
import { arrayOf, shape, number, string } from "prop-types";

const StoreList = ({ stores }) =>
  <ul>
    {stores.map(store =>
      <li key={store.id}>
        {store.name}
      </li>
    )}
  </ul>;

StoreList.propTypes = {
  stores: arrayOf(
    shape({
      id: number.isRequired,
      name: string.isRequired
    }).isRequired
  )
};

export default StoreList;
```

### Keys
Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity:

```js
<li key={store.id}>{store.name}</li>
```

>Avoid using array indexes if array items can reorder.

```js
stores.map((store, index) => <li key={index}>{store.name}</li>
```

## Writing Components
[![Edit Writing Components](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/qly8Wqk0)

For this section we will use an example of a simple button component but the technique is the same no matter what sort of component you are developing.

### Designing a Button component
At first our button is very simple:

```js
<Button text="Click me" />

const Button = ({ text }) =>
  <button className="btn">
    {text}
  </button>;
```

### More requirements
Now we need support to render an icon:

```js
<Button text="Click me!" iconName="paper-plane-o" />

const Button = ({ text, iconName }) =>
  <button className="btn">
    <i className={"fa fa-" + iconName} />
    {" " + text}
  </button>;
```

### Even more requirements!
Now the button needs text formatting, icon positioning and icon size support. **The code is getting complicated**.

```js
<Button text="Click me" textStyle="bold" iconName="paper-plane-o" iconPosition="top" iconSize="2x" />

const Button = props => {
  const icon =
    props.iconName &&
    <i
      className={classnames("fa fa-" + props.iconName, {
        ["fa-" + props.iconSize]: props.iconSize
      })}
    />;

  return (
    <button className="btn">
      {icon &&
        (props.iconPosition === "top"
          ? <div>
              {icon}
            </div>
          : <span>
              {icon + " "}
            </span>)}
      {props.textStyle === "bold"
        ? <strong>
            {props.text}
          </strong>
        : <span>
            {props.text}
          </span>}
    </button>
  );
};
```

It is clear we cannot continue designing the component in this way for long before it becomes unmanageable.

### Composition to the rescue
Instead of using lots of props and a single complicated `render` method split the component into smaller chunks and use composition to render it instead.

```js
<Button>
  <FontAwesome
    name="paper-plane-o"
    size="2x"
    block />
  <strong>Click me</strong>
</Button>

const Button = ({ children }) =>
  <button className="btn">
    {children}
  </button>;

const FontAwesome = ({ name, size, block }) =>
  <i
    className={classnames("fa", "fa-" + name, {
      ["fa-" + size]: size,
      ["center-block"]: block
    })}
  />;
```

This takes advantage of the special `children` prop which is the cornerstone of composition using React.

### Summary
You might need composition when:

* There are too many props
* There are props to target a specific part of the component (iconName, iconPosition, iconSize, etc.)
* There are props which are directly copied into the inner markup
* There are props which take a complex model object or an array

## Unit Testing
Testing should be simple!

* React components are easy to test.
* Presentational components (stateless functional components) should be treated as pure functions.
* Two common testing patterns are:
  * DOM testing
    * Find DOM nodes, simulate events
  * Snapshot testing
    * Compares files of JSON output
    * Show the diff

### Snapshot testing
Snapshot testing is a feature of **Jest** that can be used to test *any* JavaScript object. And thanks to a package called `react-test-renderer` you can convert a React component to an object to use with snapshot testing.

For example:

```js
import React from "react";
import renderer from "react-test-renderer";
import IPAddress from "../IPAddress";

it("renders", () => {
  const component = renderer.create(<IPAddress ip="127.0.0.1" />);
  expect(component).toMatchSnapshot();
});
```

When the test runs for the first time a special snapshot file is created in a sub-folder containing the JSON output of the render. The next time you run the test it generates new output and compares it with the snapshot: if there are any differences then the test has failed and you are presented with the object diff. At this point you can decide to regenerate the snapshot.

### DOM testing
Alternatively you can render your components into a in-memory DOM (`jsdom`).

* Use `react-dom/test-utils` or `enzyme`
* Find DOM nodes and check attributes
* Simulate events
* Mock event handlers

> Note that this does not work with stateless functional components unless you wrap them with a class (you can use a simple HOC for this.)

For example:

```js
import React from "react";
import Greeting from "../Greeting";
import ReactTestUtils from "react-dom/test-utils";

it("renders", () => {
  const onClick = jest.fn();
  const instance = ReactTestUtils.renderIntoDocument(
    <Greeting name="The name" onClick={onClick} />
  );
  const h1 = ReactTestUtils.findRenderedDOMComponentWithTag(instance, "h1");
  ReactTestUtils.Simulate.click(h1);
  expect(onClick).toHaveBeenCalled();
});
```

In this example we use `ReactTestUtils` to render the component, look for the `<h1>` tag and simulate a click event. We then check that our `onClick` prop was called.

#### Wrapping stateless functional components for `ReactTestUtils`
`ReactTestUtils` does not play well with stateless functional components. To fix this simply wrap your component with a class when testing. You can use an HOC for this in your project:

```js
const withClass = Component => {
  return class extends React.Component {
    render() {
      return <Component {...this.props} />;
    }
  };
};

const Component = withClass(Greeting);
const instance = ReactTestUtils.renderIntoDocument(
  <Component name="The name" onClick={onClick} />
);
```

## State
### State updates may be asynchronous!

React may batch multiple `setState()` calls into a single update for performance.

Because `this.props` and `this.state` may be updated asynchronously, you should not rely on their values for calculating the next state.

```js
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment
});
```

Instead, you can use the **function version of `setState`**.

```js
// Correct
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```

Always use this version of `setState` if you need access to the previous state or props.

#### State update functions can be extracted and tested
Another benefit of using the function version of `setState` is you can extract them from your class, turn them into **thunks** and add tests for them. If you stick to using immutable data for your state then the update functions should be pure which makes them even easier to test. You can even share state update functions amongst your components.

For example:

```js
// Stores.js
export const addStore = (id, name) => prevState => ({
  stores: [...prevState.stores, { id, name }]
});

export default class Stores extends React.Component {
  state = { stores: [] };

  onAddStore = () => {
    this.setState(addStore("ID", "NEW STORE NAME"));
  }
  ...
}

// Stores.test.js
import { addStore } from "./Stores";

it("adds a store to the state", () => {
  const prevState = {
    stores: [
      {
        id: "1",
        name: "Store 1"
      },
      {
        id: "2",
        name: "Store 2"
      }
    ]
  }
  expect(addStore("3", "Store 3")(prevState)).toMatchSnapshot();
});
```

### Immutable data

* React tends to favour functional programming paradigms
* Mutable data can often be a source of bugs and unintended side effects
* Using immutable data can simplify testing
* Redux relies on immutable state to work correctly
* You don't necessarily need ImmutableJS: ES6 will usually suffice
* Immutable data can be used alongside `React.PureComponent` for a very simple performance boost

#### Immutable arrays
[![Edit Immutable Arrays](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/D9mx04lQA)

Here is an example of using `Array.prototype.map` to clone an array and modify a single element:

```js
this.setState(prevState => ({
  items: prevState.items.map(item => {
    if (item.id === idToFind) {
      return { ...item, toggled: !item.toggled };
    }
    return item;
  })
}));
```

You can make a shallow copy of an array and add a new element at the same time using the **array spread operator**:

```js
this.setState(prevState => ({
  items: [...prevState.items, { id: "3", name: "New store" }]
}));
```

You can remove elements from an array using `Array.prototype.slice`:

```js
this.setState(prevState => ({
  // Remove the first element
  items: prevState.items.slice(0, 1)
}));
```

## Props
### Destructuring
You can increase code readability be destructuring props. For example:

```js
render() {
  const { name, email } = this.props;

  return (
    <div>
      <p>{name}</p>
      <p>{email}</p>
    </div>
  )
}
```

### Don't pass on unknown props
If you are wrapping components with another do not pass down any props that the wrapped component does not know about. This will generate a console warning in the browser. For example, this is wrong:

```js
const Input = props => {
  const type = props.isNumeric ? "number" : "text";
  // <input> does not know about isNumeric
  // This will generate a console warning
  return <input {...props} type={type} />;
};

Input.propTypes = {
  isNumeric: PropTypes.bool
};
```

To fix this you can use the **object spread operator** to extract the props you care about and add the remaining ones to a single variable. For example:

```js
const Input = props => {
  const { isNumeric, ...other } = props;
  const type = isNumeric ? "number" : "text";
  return <input {...other} type={type} />;
};

Input.propTypes = {
  isNumeric: PropTypes.bool
};
```

## Pure Components
>Premature optimization is the root of all evil.

Most of the time you are probably not going to worry about performance but there are times when you might to avoid potentially costly `render`s and this is where `React.PureComponent` can help.

When React needs to reconcile the virtual DOM it will call your component `render` method and compare it with an in-memory copy. If anything has changed then the real DOM is updated. Usually this is fast but if your `render` function is slow (perhaps it renders many components) then there could be a delay while reconciliation takes place.

However, there is a React lifecycle method you can override called `shouldComponentUpdate` and if you return `false` from this then your `render` method **will not be called**.

To make this easier to manage you can derive your component class from `React.PureComponent` which overrides `shouldComponentUpdate` and performs a simple (and fast) value comparison of your props and state: if there are no changes then the function returns `false` and no render will occur.

So if your `render` method renders exactly the same result given the same props and state then you can use `React.PureComponent` for a potential performance boost.

>React performs a *value* comparison of your props and state and **not** a deep object comparison. Therefore you should use immutable data for all props and state to ensure this comparison works as expected: otherwise your component may not render when you expect it to.

[![Edit Pure Components](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/qjnj3n2Ly)

For example:

```js
import React from "react";
import PropTypes from "prop-types";

export default class MyList extends React.PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        text: PropTypes.text
      })
    )
  };

  render() {
    // Only called if the props have changed
    return (
      <List>
        {this.props.items.map(item =>
          <ListItem key={item.id} primaryText={item.text} />
        )}
      </List>
    );
  }
}
```

If the `items` prop changes (is replaced with a new copy of the data) then the component will render.

## Project Structure
There are numerous ways to structure your React project. One common layout for components:

* Components are located in `src/components/ComponentName.js`.
* Component-specific CSS is located in `src/components/ComponentName.css`.
* Component tests are located in `src/components/__tests__/ComponentName.test.js`.
* Component stories are located in `src/components/__stories__/ComponentName.stories.js`
* React Styleguidist component examples (if applicable) are located in `src/components/__examples__/ComponentName.md`

If you're using `redux`:

* Code to initialise your store is located in `src/store.js`
* Reducers are located in `src/reducers`
* Action creators are located in `src/actions`
* Selectors are located in `src/selectors`
* Action constants are located in `src/constants/actions.js`

Try and limit the number of files in the root `src` folder but be careful not to overdo your folder structure. There is nothing wrong with lots of files in one folder (Facebook use a monorepo: they have over 30,000 components in a single folder!)

An example layout may look like this:

```
src\
  index.js
  App.js
  setupTests.js
  components\
    __tests__\
      Button.test.js
    __stories__\
      Button.stories.js
    Button.js
    Button.css
  containers\
    __tests__\
      MainPage.test.js
    MainPage.js
  utils\
    __tests__\
      sharedStuff.test.js
    sharedStuff.js
    testUtils.js
```

Another layout involves a separate folder with each component containing the source code, CSS, tests, stories and any other component-specific files. For this to be manageable you need to also add an `index.js` that imports the component and this is not recommended for beginners.

## Summary

* It's just JavaScript.
* Use functional programming patterns and techniques where possible.
* Use containers/presentational components.
* Always declare your prop types.
* Take advantage of ES6 and ESNext.
* Use immutable data.
* Use snapshot testing.
* Use the function form of `setState` if you need access to the previous state or props.
* Favour small components and composition when building your UI.
* Don't ignore console warnings.
