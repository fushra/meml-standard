# MEML Syntax Standard

This provides implementation details for the meml syntax. For an introduction to creating a language please see [crafting interpreters](https://craftinginterpreters.com/). A large part of this language standard guide is based off this book.

## Language grammar

Again, the language grammar here is based off of that for lox. Here page is a program. It contains everything in a file.

```ts
// This is the entry point into the program (a single file).
//
// DISCUSSION: How should scripting work? Should it be JS
//             passthrough, should it be limited to inside
//             custom tags, should it be LISP or should it
//             be something more c-like (or python-like)
page        = ('(' declaration ')')* EOF;

// For declaring stuff like constants or components
declaration = compDecl
            | statement;

// This will contain all of the major logic, for the moment
// it only accepts meml statements, but that will change once
// scripting is being planned
statement   = memlStmt
            | expression;

// This is how components should be defined. The MEML interpreter must
// keep a log of all of the components defined and search through them
// if it cannot find the correct tag as part of `memlStmt`. The destructure
// here is for passing in props that will be used and the identifier
// is the tag name.
compDecl    = 'component' IDENTIFIER '(' destructure ')' '(' memlStmt ')';

// This is what a meml tag will look like. Note that there
// can be as many expressions as is
memlStmt    = IDENTIFIER memlProp* statement*;

// This is the layout for the properties of a meml tag. It
// can either be a key-value pair or a key pair (for example
// `disabled`)
memlProp    = IDENTIFIER
            | IDENTIFIER '=' expression;


expression  = equality;

// Check if something is equal
equality    = comparison (('!=' | '==') comparison)*;

// Check how one value compares to anther
comparison  = term (('>' | '>=' | '<' | '<=') term)*;

// Addition or subtraction
term        = factor (('-' | '+') factor)*;

// Multiplication and division
factor      = unary (('/' | '*') unary)*;

// Used to negate or invert a value
unary       = ('!' | '-') unary
            | primary;

// Very basic stuff
primary     = NUMBER | STRING | 'true' | 'false' | 'null'
            | '(' expression ')';

// When you need to pass paramaters into a function or
// component, you would use a destructure expression.
// They only take in identifiers and WILL NOT take in
// literals
destructure = IDENTIFIER ( ',' IDENTIFIER )*;
```

## Appendix 1: Grammar reference

The grammar "pseudo-code" that is used in this document follows the basic structure defined below:

```
Identifier → What that identifier consists of
```

Here is a nice cheat sheet for all of the symbols:

- `=`: Separator
- `|`: Or, the item that comes first takes precedence
- `;`: End of this line
- `*`: None, one, or multiple
- `?`: None or one (optional)
- `(...)`: Grouping, everything inside is calculated to form one answer outside

Additionally, here is a cheat sheet of types and tokens. Typescript types are used because they are the limitation we are bound with when working with web technologies.

- `NUMBER`
- `STRING`: Text
- `EOF`: End of file token
- `IDENTIFIER`: The name of a defined value, for example tag or variable. like a string, just for a compiler
