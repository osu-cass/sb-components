# Accessibility

## Minimum Requirements
* Use a keyboard to interact with components (tab, space, enter, shift-tab)
* Icons should have aria-hidden
* Links or buttons with no text need to have aria-label or labeled-by. More info [here](http://fontawesome.io/accessibility/)
* Roles should be used unless input (input type does this automatically). More info  [here](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques)
* Check contrast of components being used (storybook accessibility tab) or [color-contrast-tool](https://webaim.org/resources/contrastchecker/)
* Storybook accessibility tab should have no issues

## Resources
* A11y [here](http://a11yproject.com/checklist.html)
* React Accessibility [here](https://reactjs.org/docs/accessibility.html)
* MDN button and links [here](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_button_role)
* MDN Accessibility [here](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)
* Font awesome [here](http://fontawesome.io/accessibility/)
* MDN Aria roles [here](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques)
* Tables [here](https://webaim.org/techniques/tables/data)

## TSLint
- Linting is enabled for this project to determine if elements are compliant
    * Note this does not check for everything. Manual checks required
- Enable vscode tslint for the best experience when developing