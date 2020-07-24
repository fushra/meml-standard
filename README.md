<img src="https://raw.githubusercontent.com/fivnex/meml/master/meml-logo.png?token=APABEOE65MZQBP4LY2CCW6S66FUMI" alt="meml-icon" width="50px" />

# Minimal Efficient Markup Language
Extension: `.meml`

## What is MEML?
MEML is a simple markup language that translates into HTML/CSS. MEML includes tags that are dedicated to basics like a dropdown menu tag, viewport tag, charset tag, navigation, and minimalization of HTML/CSS.

MEML is built with JavaScript and Sass. JavaScript is used to translate the MEML code into valid HTML/CSS. The Sass is built to work on the functionality of some of the tags, and prebuilt options.

MEML gets inspiration from languages such as LISP, HTML itself, and Pug. Most of the inspiration for MEML is from LISP.

## How to use MEML
> NOTE: Early 0.* and 1.* editions might have issues supporting many other tags if they are not added to the language itself. A fix might be needed for more advanced tags. Note that tags like "script" will bLater editions will better support custom notifiers like e limited to external sources for the short-term future.

A basic webpage in MEML looks like this:

`index.meml`

---
```
(head
    (title "Hello World!"))
(body
    (p "Basic website made with MEML!"))
```

---
You might notice that there are missing tags. Tags such as `<!DOCTYPE html>` are voided, and the `<html>` tag itself is missing. This is intensional, and no reason to include them at this time!

> The "lang" classifier is its own tag, to be set in the head 
`(lang "en")`

If you have experience in the LISP programming language, or anything similar (like Racket and Clojure), you will notice the syntax is very similar. If you have not, it is less scary than it might look!

You can read more in the docs: [here](https://meml.readthedocs.io).

---