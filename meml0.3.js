// Variables
var fs = require("fs")
var cliArgs = process.argv.slice(2)
var version = "0.3"
var defaultOutputName = cliArgs[0].replace(".meml", ".html")
var output = defaultOutputName

// The best function, replaces everything
function replaceAll(string, search, replace) {
    return string.split(search).join(replace)
}

// Not a proper lexer, just makes sense of the code.
function lexer(ast){
    /**
     * The openData and closedData are array placements of
     * where the open/closed paren placement are in the ast
     * variable. Later, mathematics will find how they are 
     * placed, and where identification puts them.
     */
    var openData = new Array
    var closedData = new Array
    // keywordData is the name of discovered keywords
    var keywordData = new Array
    for (i in ast){
        if (ast[i] == "("){
            openData.push(i)
        } else if (ast[i] == ")"){
            closedData.push(i)
        } else if (ast[i].match(/^[A-Za-z]+$/) && !ast[i].includes("\"")){
            keywordData.push(ast[i])
        }
    }
    var openCount = openData.length
    var closedCount = closedData.length

    /**
     * Mathematically discovering placement of tags will run on two
     * main "truths" : 1 - ID is supported by largest number wins
     * and 2 - ID depend on placement, this creates a bunch of confusing
     * mathematics that help us decide whether or not the tag closes for
     * ID 1 or ID 2. In short, the math is simple. It take s the ID's,
     * for example, 1 2 3. The closing tags then get assigned an ID based
     * on where the 1 2 3 open, and where the others close. If it is in order
     * with no issue based on intertwined placement, the ID's for the closed 
     * paren in order are 3 2 and 1. If a closed paren happens before a larger
     * ID, lets say ( ( )  ( ) ) for example, the ID for open parens do not change.
     * The list is then 1 2 X 3 X X - to find the ID of the X (closing parens), we
     * look into what ID is largest before a close. So the ID's of both open and closed
     * are then 1 2 2 3 3 1. 
     */

    // 1 2 2 1 / 1 2 2 1

    var openIDCounter = 0
    var openID = new Array
    var closedID = new Array
    for (i in openData){
        console.log(parseInt(i) + 1)
        var counter = 0
        for (i in closedCount){
            if (counter < closedCount){
                if(openData[i] < closedData[counter]){
                    if (openData[i] < openData[i+1]){
                        console.log(parseInt(i))
                    } else {
                        console.log("err", parseInt(i))
                    }
                } else {

                }
            }
            counter++
        }
        openIDCounter++
        openID.push(openIDCounter)
    }

    console.log(openData + " : " + openCount, "|||", closedData + " : " + closedCount, "|||", keywordData)
}

// Parses and splits syntax
function parser(text){
    text = text.split("\n")

    // Remove extra whitespace, comments, and blank parts
    /** 
     * This is a weird solution, but the only
     * stupid solutions are the ones that don't
     * work
     */

    for (i in text){
        text[i] = text[i].trim()
        for (i in text){
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
        itemCount = 0
        itemPlaceOne = 0
        itemPlaceTwo = 0
        itemDist = 0
        itemCounted = 0
    }
    
    // final blankspace scrub
    for (i in text){
        text[i] = text[i].trim()
        if (text[i] == ""){
            text.splice(i, 1)
        }
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
} else {
    console.log("ERROR: No arguments found, please run the command with \"--help\" for help info")
}