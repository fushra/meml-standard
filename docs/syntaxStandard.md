# MEML Syntax Standard

This provides implementation details for the meml syntax. For an introduction to creating a language please see [crafting interpreters](https://craftinginterpreters.com/). A large part of this language standard guide is based off this book.

## Language grammar

Again, the language grammer here is based off of that for lox. Here page is a program. It contains everything in a file.

```ts
// This is the entry point into the program (a single file).
page        → statement* EOF;

// This will contain all of the major logic, for the moment
// it only accepts meml statements, but that will change once
// scripting is being planned
statement   → memlStmt;

// This is what a meml tag will look like. Note that there
// can be as many expressions as is
//
// TODO: Add properties to meml tags
memlStmt    → "(" identifier exprOrMeml* ")";

// Expression statements and meml can be used interchangeably
// within a tag
exprOrMeml  → memlStmt
            | expression;

// Doing math, boolean logic or combining strings and such
expression  → literal
            | unary
            | binary
            | grouping;

// Contains all of the raw data types.
literal     → number
            | string
            | 'true'
            | 'false'
            | 'null';

// Used to negate or invert a value
unary       → ('-' | '!') expression;

// This is your standard something + something or a boolean
// comparison
binary      → expression operator expression;

// Everything inside of the grouping takes precedence to
// everything outside
grouping    → "(" expression ")";

// All of the different operators that you should want
//
// DISCUSSION: Should we include === or does that just
//             need to die
operator    → "==" | "!=" | "<" | "<=" | ">" | ">="
            | "+"  | "-"  | "*" | "/" ;
```

## Appendix 1: Grammar reference

The grammar "pseudo-code" that is used in this document follows the basic structure defined below:

```
Identifier → What that identifier consists of
```

Here is a nice cheat sheet for all of the symbols:

- `→`: Separator
- `|`: Or, the item that comes first takes precedence
- `;`: End of this line
- `EOF`: End of file token
- `*`: None, one, or multiple
- `(...)`: Grouping, everything inside is calculated to form one answer outside

Additionally, here is a cheat sheet of types and tokens. Typescript types are used because they are the limitation we are bound with when working with web technologies.

- `number`
- `string` a set of text
