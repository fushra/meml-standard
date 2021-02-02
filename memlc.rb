#!/usr/bin/ruby
# See if argument count is adiquite 
unless ARGV.length >= 1
    puts "Invalid number of arguments"
    puts "Usage: ruby memlc.rb <filename>.meml"
    puts "Usage: ruby memlc.rb <folder with meml files>"
    exit
end

def looper(file)
    if File.directory?(file)
        files = Dir.entries(file)
        for sub_file in files
            if sub_file == ".." or sub_file == "."
            else
                path = "#{file}/#{sub_file}" # ruby magic paths work the same on unix(mac os, linux, bsd, etc) and windows. 
                looper(path)
            end
        end
    else
        if (file.end_with?(".meml"))
            puts file + " proper file format" #call function to convert file
        end
    end
end

# Set variables
input_file = ARGV[0]
looper(input_file)