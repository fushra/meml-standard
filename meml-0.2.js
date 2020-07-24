// Variables
var fs = require("fs")
var cliArgs = process.argv.slice(2)
var version = "0.1"
var defaultOutputName = cliArgs[0].replace(".meml", ".html")
var output = defaultOutputName
var htmlExtras
var htmlTag = "<html " + htmlExtras + ">"
var htmlBegin = "<!DOCTYPE html>" + htmlTag
var htmlEnd = "</html>"
var openParen = 0
var closedParen = 0
var keyword = 0

// The best function, replaces everything
function replaceAll(string, search, replace) {
    return string.split(search).join(replace)
}

function lexer(text) {
    // Fix issues with body and head tag (adds comma)
    for(i in text){
        if(text[i].startsWith("body")){
            text[i] = "body"
        } else if(text[i].startsWith("head")){
            text[i] = "head"
        }
    }

    // Get data
    for(i in text){
        if (text[i] == "("){
            // Open paren counting (for data)
            openParen++
        } else if (text[i] == ")"){
            // Closed paren counting (for data)
            closedParen++
        } else if (text[i].match(/^[A-Za-z]+$/) && !text.includes("\"")){
            keyword++
        }
    }

    console.log(text, openParen, closedParen, keyword)
}

// Parse text
function parser(text){
    text = text.split("\n")

    // Remove extra whitespace, comments, and blank parts
    /** 
     * This is a weird solution, but the only
     * stupid solutions are the ones that don't
     * work
     */
    for (i in text){
        for (i in text){
            text[i] = text[i].trim()
            for (i in text){
                if (text[i].startsWith("//")){
                    text.splice(i, 1)
                }
                if (text[i] == ""){
                    text.splice(i, 1)
                }
            }
        }
    }

    // Split out all keywords
    text = text.join()
    text = replaceAll(text, ")","\n)\n")
    text = replaceAll(text, "(","\n(\n")
    text = replaceAll(text, "\"","\n\"\n")
    text = replaceAll(text, " ","\n \n")
    text = text.split("\n")

    // Record data
    var itemCount = 0
    var itemPlaceOne = 0
    var itemPlaceTwo = 0
    var itemDist = 0
    var itemCounted = 0
    var c = 0
    for (i in text){
        if (text[i] == "\"" ){
            // Join strings together
            itemCount++
            if (itemCount%2 == 0){
                itemPlaceTwo = c
                itemDist = itemPlaceTwo - itemPlaceOne - 1
                for(x=0; x <= itemDist; x++){
                    itemCounted = itemPlaceOne + x + 1
                    text[itemPlaceOne] += text[itemCounted]
                }
                text.splice(itemPlaceOne + 1, itemDist + 1)
            } else {
                itemPlaceOne = c;
            }
        }

        c++
    }
    
    lexer(text)
}

// CLI Argument Reading
if (cliArgs[0].endsWith(".meml")){
    // CLI output
    if(cliArgs[1] === "--output " || cliArgs[1] === "-o"){
        output = cliArgs[2]
        console.log("New Output Filename:", output)
    }

    // Read file and call parser
    var text = fs.readFileSync(cliArgs[0]).toString('utf-8')
    parser(text)

} else if (cliArgs[0] === "--help" || cliArgs[0] === "-h"){
    console.log(`    MEML ${version}
    meml [options] [options...] [options...]
    is question's answers are a community effort. Edit existing answers to improve this post. It is not currently accepting new answers or interactions. 
    options:
    -h | --help      - Displays help information
    -v | --version   - Displays version number
    -o | --output    - Sets output file name/location
    
    Default Command Usage:
    meml index.meml
    meml somefile.meml -o outputname.html
    meml --version`)
} else if (cliArgs[0] === "--version" || cliArgs[0] === "-v"){
    console.log("MEML Version:", version)
}