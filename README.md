<img src="https://raw.githubusercontent.com/fivnex/meml/master/meml-logo.png?token=APABEOE65MZQBP4LY2CCW6S66FUMI" alt="meml-icon" width="50px" />

# Minimal & Efficient Markup Language
Extension: `.meml`

## What is MEML?
MEML is a simple markup language that translates into HTML/CSS. MEML includes tags that are dedicated to basics like a dropdown menu tag, viewport tag, charset tag, navigation, and minimization of HTML/CSS.

MEML gets inspiration from languages such as LISP, HTML itself, and Pug. Most of the inspiration for MEML is from LISP.

## Why MEML over anything else?
MEML is really trying to dedicate work to replacing complex HTML and CSS/SASS. Instead of just adding slightly better syntax and basic functionality, MEML tries to actively innovate and simplify HTML/CSS/JS/PHP/SASS/SCSS. 

While other brilliant projects do the job for people who want to build a website fast with wonderful functionality, MEML actively tries to really minimize the amount of needed CSS/SASS/SCSS/Front-end JavaScript.

MEML is all about simplifying the art of web-development, and is mostly dedicated for static/bare-bones websites, like personal portfolios, news aggregation websites, and minimal social-media like Facebook, Twitter, Mastodon, and Gab try to be.

While resources like Pug.JS, Vue/Angular/React, Bootstrap, and Gatsby.JS will be preferable to some people, MEML is here for those who need a minimalist HTML-like language for quick and easy web development.

Here are some features intended for implementation in MEML:
- Variables
- Drop-down menu tags
- No-CSS Flex-boxes
- No-CSS font and color changes
- No-CSS centering, and floats
- No-PHP/JS contact forms
- Simplified contact forms
- No-CSS underlines of different types
- No-CSS navigation bar
- NPM/Custom package importation system
- Simplified meta-tags
- Simplified viewport tags
- Simplified mobile compatibility
- No-JS basic programming
- Built-in desktop-app functionality (with choice of Electron or Neutrlino.JS)
- Etc.

MEML, while half markup-language, will also provide

## How to use MEML
> NOTE: Early 0.* and 1.* editions might have issues supporting many other tags if they are not added to the language itself. A fix might be needed for more advanced tags. Note that tags like "script" will bLater editions will better support custom notifiers like e limited to external sources for the short-term future.

A basic webpage in MEML looks like this:

`index.meml`

```lisp
(head
    (title "Hello World!"))
(body
    (p "Basic website made with MEML!"))
```

This will normally translate to HTML like this:

`index.html`

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Hello World!</title>
    <head>
    <body>
        <p>Basic website made with MEML!</p>
    </body>
</html>
```

While it doesn't do much for smaller websites like this, when getting into bigger websites with dropdowns and menus, MEML really saves on time.

`navigation.meml` (Note, this syntax may change as development continues)

```lisp
(head
    (title "navigation menu")
    (viewport scale="1"))
(body
    (nav type="full-width, flexbox")
        (fbsplit
            (img src="logo.png"))
        (fbsplit
            (dropdown "dropdown" method="click"
                (dditem "option 1" href="#")
                (dditem "option 2" href="#")
                (dditem "option 3" href="#"))
            (a "A button" type="button" border-radius="2rem" color="white" bgcolor="black" :hover.bgcolor="#333" href="#")))
```

The HTML translation:
```html
<!-- We are not yet sure how to translate this yet, but we will get on it ASAP -->
```

## Extra Infomation
You might notice that there are missing tags. Tags such as `<!DOCTYPE html>` are voided, and the `<html>` tag itself is missing. This is intensional, and no reason to include them at this time!

> The "lang" classifier is its own tag, to be set in the head 
`(lang "en")`

If you have experience in the LISP programming language, or anything similar (like Racket and Clojure), you will notice the syntax is very similar. If you have not, it is less scary than it might look!

You can read more in the docs: [here](https://meml.readthedocs.io).

---