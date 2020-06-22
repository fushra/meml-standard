// Variables
var fs = require("fs")
var readline = require("readline")
var cliArgs = process.argv.slice(2)
var version = "0"
var output = "!default"
var lines = []
var ast = []

// Functions
function createFile(){
    // Create final HTML file
}

function lexer(){
    // Make sense of parsed syntax
}

function parser(){
    var count = 0;

    console.log(lines)
}

function setlines(line){
    lines.push(line)
}

// CLI Argument Reading
if (cliArgs[0].endsWith(".meml")){
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

    readInterface.on('line', function(line) {
        setlines(line)
    });

    // Call Parser
    parser(lines)
} else if (cliArgs[0] === "--help" || cliArgs[0] === "-h"){
    console.log(`    MEML ${version}
    meml [options] [options...] [options...]
    
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