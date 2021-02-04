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
	amper // &
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
	
}

pub const (
	assign_token = [Kind.assign, .colonassign]
	valid_at_token = ['@FILE', '@LINE', "@COLUMN"]
	token_str = build_token_string()
	keywords = build_keys()
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
	s[Kind.meta ] = 'meta'
	s[Kind.src] = 'src'
	s[Kind.href] = 'href'
}

pub fn build_precedences() []Precenence{

}