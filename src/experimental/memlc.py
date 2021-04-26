# MEMLC Testing 
# Built to test MEML standards - not for actual use
# Please go to https://meml.fivnex.co for official downloads
import sys

class ReadFile:
    def __init__(self, filename, arguments):
        print("> Testing arguments")
        self.args = arguments
        self.file = filename
        print(self.args)
        count = 0
        while (count <= 1):
            self.args.pop(0)
            count += 1
        if (self.file.endswith(".meml")):
            pass
        else:
            print("ERROR 1: Requires a '.meml' file")
            print("Failed!")
            print("Exiting...")
            exit()
        print("Success!")
        print("> Setting and recording arguments")
        argument_dictionary = {
            "output": False, 
            "no-bulma": False,
            "no-htaccess": False
        }
        for i in self.args:
            if (i == "-o" or i == "--output"):
                argument_dictionary["output"] = True
                print("Output detected, testing")
                if (self.args[self.args.index(i)+1].endswith(".html")):
                    print("Success!")
                    pass 
                else:
                    print("ERROR 2: No html output detected")
                    print("Failed!")
                    print("Exiting...")
                    exit()
            elif (i == "-nb" or i == "--no-bulma"):
                argument_dictionary["no-bulma"] = True
            elif (i == "-nh" or i == "--no-htaccess"):
                argument_dictionary["no-htaccess"] = True
            elif (i.endswith(".html") and self.args[self.args.index(i)-1] == "-o" or self.args[self.args.index(i)-1] == "--output"):
                pass
            else:
                print("ERROR 3: Unknown argument error")
                print("Failed!")
                print("Exiting...")
                exit()
        print(argument_dictionary)
        print("Success!")
        print("> Testing file")
        print(self.file)
        print("File type previously tested, success")
        print("> Testing file contents")
        self.code = open(self.file)
        print(self.code.read())
        if(self.code == "" or self.code == " "):
            print("ERROR 4: File empty")
            print("Failed")
            print("Exiting...")
        else:
            print("File has contents")
            print("Success!")
            print("Continuing to syntax checking!")
            return self.code.read()
        

ReadFile(sys.argv[1], sys.argv)