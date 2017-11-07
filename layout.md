# SmarterBalancedStyles

This repository contains the `.less` styles for the Smarter Balanced suite of web applications.

## Layout
```html

<body class="site-body">
  <header role="navigation">
    <div class="skip-link" id="skip-main"><a class="skip-link" href="#main">skip to main content</a></div>
    <nav role="navigation">
        <div class="sbNav">
            <div class="sbNav-titleGroup">
                <div class="sbNav-titleGroup-item">
                    ...external link
                    ...site image
                </div>
            </div>
            <div class-"sbNav-linksGroup">
                ...links class="sbNav-linksGroup-item"
            </div>
        </div>
    </nav>
  </header>
  <main id="main" class="container site-content" role="main">
    <div class="{page}-container">
        ...
    </div>
  </main>
  <footer role="contentinfo">…</footer>
</body>

```

