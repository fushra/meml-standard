/**
 * The OFFICIAL MEML compiler.
 * Version: 1.0
 * 
 * Borrows modifications of https://gist.github.com/BonsaiDen/1810887
 */

var KEYWORDS_LIST = [
    'var', 
    'head', 'viewport', 'title', 'charset',
    'body', 'p', 'div', 'nav', 'span', 'dropdown', 'dditem', 'a'
]

var OPERATORS_LIST = {
    '(': "OPEN_PAREN",
    ')': "CLOSED_PAREN",
    '=': "ASSIGN",
    ':': "COLON"
}