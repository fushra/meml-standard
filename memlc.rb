# See if argument count is adiquite 
unless ARGV.length >= 1
    puts "Invalid number of arguments"
    puts "Usage: ruby memlc.rb <filename>.meml"
    exit
end

# Set variables
input_file = ARGV[0]

# Read arguments
if (input_file.end_with?(".meml"))
    puts "proper file format"
else
    puts "File is not a recognized MEML script"
end