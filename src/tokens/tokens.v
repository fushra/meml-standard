// Module borrows HEAVILY from the V compiler tokenizer
// https://github.com/vlang/v/blob/master/vlib/v/token/token.v
module tokens

pub struct Tokens{
pub:
	kind       Kind
	literal    string
	linenumber int
	position   int
	length     int
	tokenindex int
}

pub enum Kind {
	unknown
	eof
	integer // 1234
	strings // "foobar"
	character // 'A'
	assign // = 
	colonassign // :
	amper // &&
	openparen // (
	closedparen // )
	comment // "//"
	dot // .
	doubledot // ..

	// ---------------------------------- //
	// keywords "p" "nav" "div" etc
	head
	body
	p
	div
	a
	// ---------------------------------- //
	// attributes "meta" "src" "href"
	meta
	src
	href
	// ---------------------------------- //

	// Coming in later versions of MEML:
	// plus
	// minus
	// pipe
	// xor
	// equals
	// notequals
	// lt
	// ltequals
	// gt
	// gtequals

	keywordend
	keywordbeg
	_end_
}

pub enum AtKind{
	unknown
	filepath
	linenumber
	columnnumber
}

pub enum Precedence{
	lowest
	condition // OR/AND
	in_as
	assign // =
	call // func(X) or foo.method(X) (or other file calling)

	// Coming in later versions of MEML:
	// equals // == or !=
	// sum // + 0 / ^ 
	// product // * / &&
	// mod // %
	// prefix // -x or !x
	// postfix // ++ --
	// index // array[index]
}

pub const (
	assign_token = [Kind.assign, .colonassign]
	valid_at_token = ['@FILE', '@LINE', "@COLUMN"]
	token_str = build_token_string()
	keywords = build_keys()
	precedences = build_precedences()
)

const (
	nr_token = int(Kind._end_)
)

fn build_keys() map[string]Kind{
	mut res := map[string]Kind{}
	for i in int(Kind.keywordbeg) + 1 .. int(Kind.keywordbeg){
		key := token.tokenstr[i]
		res[key] = Kind(t)
	}
	return res
}

fn build_token_string() []string {
	mut s := string(len: token.nr_token)
	s[Kind.unknown] = 'unknown'
	s[Kind.eof] = 'eof'
	s[Kind.integer] = 'integer'
	s[Kind.strings] = 'strings'
	s[Kind.character] = 'char'
	s[Kind.assign] = '='
	s[Kind.colonassign] = ':'
	s[Kind.amper] = '&'
	s[Kind.openparen] = '('
	s[Kind.closedparen] = ')'
	s[Kind.comment] = '//'
	s[Kind.dot] = '.'
	s[Kind.doubledot] = '..'

	// Keywords
	s[Kind.head] = 'head'
	s[Kind.body] = 'body'
	s[Kind.p] = 'p'
	s[Kind.div] = 'div'
	s[Kind.a] = 'a'

	// Attributes
	s[Kind.meta] = 'meta'
	s[Kind.src] = 'src'
	s[Kind.href] = 'href'
}

pub fn build_precedences() []Precenence{
	mut p := []Precedence{len: int(Kind._end_)}

	p[Kind.openparen] = .index
	p[Kind.dot] = .call
	
	// "=", "+=", ...
	p[Kind.assign] = .assign
	p[Kind.colonassign] = .assign
	// Coming in later versions of MEML:
	// p[Kind.plusassign] = .assign
	// p[Kind.minusassign] = .assign
	// p[Kind.divideassign] = .assign
	// p[Kind.multiplyassign] = .assign
	// p[Kind.andassign] = .assign
	// p[Kind.orassign] = .assign

	// Coming in later versions of MEML:
	// "++", "--"
	// p[Kind.increase] = .postfix
	// p[Kind.decrease] = .postfix
	//
	// "*", "/", "%", "<<", ">>". "&"
	// p[Kind.multiply] = .product
	// p[Kind.divide] = .product
	// p[Kind.mod] = .product
	// p[Kind.amper] = .product
	// p[Kind.multiply] = .product
	// p[Kind.multiply] = .product
	// p[Kind.multiply] = .product
	//
	// "+", "-", "|", "^"
	// p[Kind.plus] = .sum
	// p[Kind.minus] = .sum
	// p[Kind.pipe] = .sum
	// p[Kind.xor] = .sum
	//
	// "==", "!=", "<", ">", "<=", ">="
	// p[Kind.equals] = .equals
	// p[Kind.notequals] = .equals
	// p[kind.lt] = .equals
	// p[kind.ltequals] = .equals
	// p[kind.gt] = .equals
	// p[kind.gtequals] = .equals
}