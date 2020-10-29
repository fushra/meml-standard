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

// translator
function translator(text){
    // Discover all tags
    var openTags = new Array
    var closedTags = new Array
    for (i in text){
        if (text[i] == "("){
            openTags.push(i)
        } else if (text[i] == ")"){
            closedTags.push(i)
        }
    }

    var tagslist = new Array
    // Join Open Tags
    //===============================================================//
    for (i in openTags){
        text[parseInt(openTags[i])] = "<" + text[parseInt(openTags[i])+1] + ">"
        tagslist.push(text[parseInt(openTags[i])+1])
        delete text[parseInt(openTags[i])+1]
    }

    text = text.filter(el => {
        return el != null && el != '';
    });
    //===============================================================//

    console.log(text, openTags, closedTags, tagslist)
    /*
    Steps to finding the open/closed tag pair
    - count open tags until # is larger than closed tag placement
    - take the largest of the numbers for the smallest current closing tag
    */

    for (i in closedTags){

    }
}

// Code Splitter
function splitCode(text){
    text = text.split(/\r?\n/)
    for (i in text){
        // Remove unneeded whitespace
        text[i] = text[i].trim()
        // Remove comments
        if (text[i].startsWith("//")){
            delete text[i]
        }
    }

    text = text.filter(el => {
        return el != null && el != '';
    });

    text = text.join("")
    text = replaceAll(text, ")","\n)\n")
    text = replaceAll(text, "(","\n(\n")
    text = replaceAll(text, "\"","\n\"\n")
    text = text.split(/\r?\n/)

    text = text.filter(el => {
        return el != null && el != '';
    });

    // Code from MEML 0.2 (if it fits, it sits)
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

    // Trim all code before next step
    for (i in text){
        text[i] = text[i].trim()
    }

    translator(text)
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
    splitCode(text)

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