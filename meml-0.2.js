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
var keywordList = new Array
var keywordPlacement = new Array
var openParenPlacement = new Array
var closedParenPlacement = new Array
var openToNextClosed = 0
var currentOpenToClose = new Array
var closedAfterOpens = new Array

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
    // Get data for parens and keywords for proper compiles
    for(i in text){
        if (text[i] == "("){
            // Open paren counting (for data)
            openParen++
            openParenPlacement.push(i)
            openToNextClosed++
            currentOpenToClose.push(openToNextClosed)
        } else if (text[i] == ")"){
            // Closed paren counting (for data)
            closedParen++
            closedParenPlacement.push(i)
            closedAfterOpens.push(openToNextClosed)
            openToNextClosed = 0
        } else if (text[i].match(/^[A-Za-z]+$/) && !text.includes("\"")){
            keyword++
            keywordList.push(text[i])
            keywordPlacement.push(i)
        }
    }

    for(i in closedAfterOpens){
        console.log(currentOpenToClose, closedAfterOpens)
    }

    // The tag placement
    /**
     * This method is going to take Keyword Placement, Open Paren Placement, and Closed Paren Placement
     * variables and using the Keyword List, place where everything is going. The amazing part of using a
     * Lisp-like syntax, you take the keyword list item placement, place them where the proper open parens
     * are in, and to close it we need to just do the reverse for closed paren! We also just kill the
     * the Keyword Placement, so we can remove it. 
     */
    for (i in text){
        for (x in keywordList){
            // Combine tags with open parens
            if (i === openParenPlacement[x]){
                text[i] = "<" + keywordList[x]
                //close tag
                text[closedParenPlacement[x]] = "</" + keywordList[x] + ">"
            }
        }
        /**
         * Since the tags are now proper, we need to now
         * remove the old "tag" points. This needs to happen
         * after both the open parens are done, and the closed
         * parens as to not confuse the data later on.
         */
    }
    console.log(text, openParen, closedParen, keyword , keywordList, openParenPlacement, closedParenPlacement)
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
    text = text.join("")
    text = replaceAll(text, ")","\n)\n")
    text = replaceAll(text, "(","\n(\n")
    text = replaceAll(text, "\"","\n\"\n")
    text = replaceAll(text, " ","\n \n")
    text = text.split("\n")
    // clean array
    for(i in text){
        if (text[i] === ""){
            text.splice(i, 1)
        }
    }
    // Record data
    var itemCount = 0
    var itemPlaceOne = 0
    var itemPlaceTwo = 0
    var itemDist = 0
    var itemCounted = 0
    var c = 0
    for (i in text){
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
        c = 0
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