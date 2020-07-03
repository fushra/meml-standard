// Variables
var fs = require("fs")
var cliArgs = process.argv.slice(2)
var version = "0.0.1_public-beta"
var defaultOutputName = cliArgs[0].replace(".meml", ".html")
var output = defaultOutputName
var htmlTag = "<html "
var htmlBegin = "<!DOCTYPE html>" + htmlTag
var htmlEnd = "</html>"

// Functions
function createFile(outputData){
    fs.writeFile(output, outputData, function (err) {
        if (err) return console.log(err)
        console.log("File Created:", output)
    });
}

function codeStitcher(codeLibrary, ixt){
    codeLibrary = codeLibrary.join("")
    codeLibrary = htmlBegin + ixt + ">" + codeLibrary + htmlEnd
    createFile(codeLibrary)
}

function lexer(ast){
    // Variables to find string and string placement
    var itemCount = 0
    var itemPlaceOne = 0
    var itemPlaceTwo = 0
    var itemDist = 0
    var itemCounted = 0

    // General count variable
    var c = 0

    // Make the AST more complete
    for (i in ast){

        // Combine Strins
        if (ast[i] === "\"" ){
            itemCount++

            if (itemCount%2 == 0){
                itemPlaceTwo = c;

                // Start combining strings
                itemDist = itemPlaceTwo - itemPlaceOne - 1
                for(x=0; x <= itemDist; x++){
                    itemCounted = itemPlaceOne + x + 1
                    ast[itemPlaceOne] += ast[itemCounted]
                }
                ast.splice(itemPlaceOne + 1, itemDist + 1)
            } else {
                itemPlaceOne = c;
            }
        }

        // Combine Tags with open paren
        if (ast[i] === "("){
            ast[c] += ast[c+1]
            ast.splice(c+1, 1)
        }

        c++
    }
    c = 0 // reset C for future counts

    // Join and trim AST
    ast = ast.join("")
    ast = ast.trim()
    ast = replaceAll(ast, "(","\n(")
    ast = replaceAll(ast, ")",")\n")

    // Split AST by open paren, and keep  tag
    ast = ast.split("\n")
    ast = ast.filter(item => item)

    /**
     * The next part of the lexer discovers items like body and head
     * where the tags are seperated by the inner items. The method
     * could be better, but for now it works.
     * 
     * How it works is that it checks if either has no tag (by checking
     * for open paren), or no close (by checking for closed paren)
     * 
     * If an item in the AST has both an open paren and closed paren inside
     * the string, then it is a one-line tag, and will be fixed on the spot.
     * 
     * If an item in the AST doesn't include either a closed paren or
     * open paren, it is a multi-line tag, and the closed tag is set to whatever
     * is open but not closed. 
     * 
     * This can be cause for error when compiling, and an extra paren or missing
     * paren is discovered. If it is, it will be by human error.
     */
    
    var oLine = new Array // One line placements
    var mLineOpen = new Array // Multi-Line Open placements
    var mLineClosed = new Array // Multi-Line Closed placements
    for (i in ast){
        if(!ast[i].startsWith("(")){
            mLineClosed.push(c)
        }

        if(!ast[i].endsWith(")")){
            mLineOpen.push(c)
        }
        if(ast[i].startsWith("(") && ast[i].endsWith(")")){
            oLine.push(c)
        }

        /**
         * How Translations work (ignore if tag is charset or viewport):
         * - Split the current item into [(, tag-title, "string if applic", )]
         * - Remove open paren, and put tag title in arrow bracs
         *   > Will look like [<tag-title>, "string if applic", )]
         * - Copy tag in arrow bracs and replace the closed paren
         * - Turn ending (with regex) into closed tag.
         *   > [<tag-title>, "string if applic", </tag title>]
         * - split array chunks into ast2  
         */
        // ######################################
        // Translations
        // ######################################

        // Body and head tags
        if (ast[i].startsWith("(body")){
            ast[i] = ast[i].substr(1)
            ast[i] = "<" + ast[i] + ">"
            bodyTagPlacement = c
        }

        if (ast[i].startsWith("(head")){
            ast[i] = ast[i].substr(1)
            ast[i] = "<" + ast[i] + ">"
            headTagPlacement = c
        }

        if (ast[i].startsWith("(div")){
            ast[i] = ast[i].substr(1)
            ast[i] = "<" + ast[i] + ">"
        }

        // General Tags
        // Make this better
        if (ast[i].startsWith("(") && !ast[i].startsWith("(charset") 
        && !ast[i].startsWith("(viewport") && !ast[i].startsWith("(icon") && !ast[i].startsWith("(font")
        && !ast[i].startsWith("(lang") && !ast[i].startsWith("(meta") && !ast[i].startsWith("(div")){
            ast[i] = ast[i].substr(1)
            var astName = ast[i].split("\"")[0]
            var astCont = ast[i].split("\"")[1]
            var astBegin = "<" + astName.trim() + ">"
            var astEnd = "</" + astName.trim() + ">"
            ast[i] = astBegin + astCont + astEnd
        }

        // Find opened but unclosed tags
        // Could be better but works
        for (i in mLineClosed){
            if(ast[mLineOpen[i]] === "<head>"){
                ast[mLineClosed[i]] = "</head>"
            }
            if(ast[mLineOpen[i]] === "<div>"){
                ast[mLineClosed[i] - 1] = "</div>" // Weird fix but okay
            }
            if(ast[mLineOpen[i]] === "<body>"){
                ast[mLineClosed[i] + 1] = "</body>" // Weird fix but okay
            }
        }

        // Special tag placements
        if(ast[i].startsWith("(viewport")){
            // Make this better suited later
            ast[i] = "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"></meta>"
        }
        if(ast[i].startsWith("(charset")){
            var astCont = ast[i].split("\"")[1]
            ast[i] = "<meta charset=" + astCont+ "></meta>"
        }
        if(ast[i].startsWith("(icon")){
            var astCont = ast[i].split(" ")[1]
            astCont = astCont.split(")")[0]
            ast[i] = "<link rel=\"icon\" href=" + astCont + ">"
        }
        if(ast[i].startsWith("(font")){
            var astCont = ast[i].split("\"")[1]
            astCont = astCont.split("\")")[0]
            ast[i]= "<style>body{ font-family:" + astCont + "}</style>"
        }
        if(ast[i].startsWith("(lang")){
            // This adds "lang" to htmlExtras, and hopefully will remove the code in the tree
            var astCont = ast[i].split("\"")[1]
            astCont = astCont.split("\")")[0]
            // lang="astCont"
            var ixt = "lang=\"" + astCont +"\""
            ast[i] = "" // Wont work with splicing
        }
        if (ast[i].startsWith("(meta")){
            // This is complicated of a tag
            var astCont = ast[i].split("(meta ")[1]
            astCont = astCont.split(")")[0]
            astCont = astCont.split(" ")

            // Strange but easy fix
            if (astCont.length > 2){
                var count = 2
                for(i in astCont){
                    astCont.splice(count, 1)
                    count ++
                }
            }
            var metaFirst = astCont[0]
            var metaNext = astCont[1]

            metaFirst = metaFirst.split("=")[1]
            metaFirst = replaceAll(metaFirst, "\"", "")

            metaNext = metaNext.split("=")
            metaNextItem = metaNext[0]
            metaNextContent = metaNext[1]
            // <meta name="metaFirst:metaNext" content="content from metaNext">
            ast[i] = "<meta name=\"" + metaFirst + ":" + metaNextItem + "\" content=" + metaNextContent + "></meta>"
        }
        
        c++
    }
    c = 0 // reset C variable in case of further counting

    // Get rid of empty cells in AST
    for (i in ast){
        for (i in ast){
            if(ast[i] === ""){
                ast.splice(i, 1)
            }
        }
    }

    codeStitcher(ast, ixt)
}

function replaceAll(string, search, replace) {
    return string.split(search).join(replace)
}

function parser(file){
    var c = 0

    // Split file and remove whitespace
    file = file.split("\n")
    for (i in file){
        file[i] = file[i].trim()
    }

    // Remove comments
    while(c < file.length){
        if(file[c].startsWith("//")){
            /**
             * I hate doing this but NodeJS
             * is a mess and forced my hand 
             * to do this idiotic mess in a
             * stupid while loop inside an
             * if statement
             */
            while(file[c].startsWith("//")){
                file.splice(c, 1)
            }
        }
        c++
    }

    c = 0 // Resets C (count) variable for later use 

    // String together the new file in one line
    file = file.join("")

    // Split out all keywords
    var splitFile = replaceAll(file, ")","\n)\n")
    splitFile = replaceAll(splitFile, "(","\n(\n")
    splitFile = replaceAll(splitFile, "\"","\n\"\n")
    splitFile = replaceAll(splitFile, " ","\n \n")
    splitFile = splitFile.split("\n")

    for (i in splitFile){
        if(splitFile[i] === ""){
            splitFile.splice(i, 1)
        }
    }

    lexer(splitFile) // Move onto lexer stage
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