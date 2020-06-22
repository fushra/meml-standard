// Variables
var fs = require("fs")
var readline = require("readline")
var cliArgs = process.argv.slice(2)
var version = "0"
var output = "!default"
var ast = []

// Functions
function createFile(){
    // Create final HTML file
}

function lexer(){
    // Make sense of parsed syntax
}

function parser(readInterface){
    readInterface.on('line', function(line) {
        // Trim Whitespace
        line = line.trim()
        if (line.startsWith("//")){
            line = ""
        } else if (line.startsWith("(")){

        }
        console.log(line)
    });
}

// CLI Argument Reading
if (cliArgs[0].endsWith(".meml")){
    // CLI output
    if(cliArgs[1] === "--output " || cliArgs[1] === "-o"){
        output = cliArgs[2]
        console.log("New Output Filename:", output)
    }

    // READ FILE
    const readInterface = readline.createInterface({
        input: fs.createReadStream(cliArgs[0]),
        /* Creates stupid issues
        output: process.stdout,
        */
        console: false
    });

    // Call Parser
    parser(readInterface)
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