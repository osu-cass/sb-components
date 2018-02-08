# Site Styles

This project utilizes bootstrap and the sbac-global style overrides for buttons, typography, form-controls, and custom button group. However, don't use the bootstrap grid system instead use flex when you can.

## Less

> All project specific less files are included in Assets/Styles

* `Custom.less` includes any overrides to the imported bootstrap and/or sbac-global. Includes shared custom less for the project that can be shared.
* `Layout.less` includes custom layout classes such as container and section
* `Constants.less` includes all static constants to be shared (sbac constants can be used)

## SBAC Global style

* [SBAC styleguide](http://smarterapp.github.io/SBAC-Global-UI-Kit/index.html)
* `variables.less` [github](https://github.com/SmarterApp/SBAC-Global-UI-Kit/blob/develop/src/less/variables.less)
* `colors.less` [github](https://github.com/SmarterApp/SBAC-Global-UI-Kit/blob/develop/src/less/colors.less)

## Useful Links

* [SBAC styleguide](http://smarterapp.github.io/SBAC-Global-UI-Kit/index.html)
* [Flex cheatsheet](https://www.google.com/url?sa=t&source=web&rct=j&url=http://jonibologna.com/content/images/flexboxsheet.pdf&ved=2ahUKEwjBmc_ypJLZAhVP3mMKHfRpCIoQFjADegQICBAB&usg=AOvVaw1o_nBxiwBeB1sgSG1bOrs_)
* More flex [css-tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

## Layout

All pages must have a container class. Content needs to align with the navbar content. Page app must include a page container.

### With Page Title

```html
<div className="container {page}-container">
    <h2 className="page-title">Page Title</h2>
    <div className="section section-light" style={style}>
      <p>Test Body...</p>
    </div>
</div>
```

### With No Page Title

```html
<div className="container {page}-container">
    <div className="section section-light" style={style}>
      <p>Test Body...</p>
    </div>
</div>
```

### With Full Body Styles
> Helpful for Sample Items Website full page background

```html
<div className="page-container {page}-page">
    <div className="container {page}-container">
        <div className="container section-light" style={style}>
        <p>Test Body...</p>
        </div>
    </div>
</div>

```
