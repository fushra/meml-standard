import os

fn main(){
	if os.args.len < 2{
		println("MEML compiler err 1")
		println("ERR: INVALID NUMBER OF CLI ARGS")
		println("\nUsage: " + os.args[0] + " <filename>.meml")
		exit(1)
	}
	
	if os.args[1].ends_with(".meml"){
		filename := os.args[1]
		println("Compiling to HTML: " + filename)
	} else {
		println("MEML compiler err 2")
		println("ERR: INVALID FILE")
		println("\nUsage " + os.args[0] + " <filename>.meml")
		exit(2)
	}
}