import os
import re
from datetime import datetime
from collections import Counter

class Logging:
    def search():
        iterr=0
        log_files=os.listdir('logs')
        print("Total No of Log_files Parsed:",len(log_files))
        get=input("Enter keyword to search: ")
        datestring = datetime.strftime(datetime.now(), '%Y_%m_%d_%H_%M')
        new_file= open(f'{get}_{datestring}.log', 'a+')
        for files in log_files:
            files_list=os.path.join(os.getcwd()+'\\logs\\'+log_files[iterr])
            with open(files_list, 'r') as files:
                for line in files:
                    if get in line:
                        print(line, file=new_file)
            iterr+=1
                       

    # Filtering attributes        
    def log_reader():
        iterator=0
        myregex = r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}'
        log_files=os.listdir('logs')
        ff = open("ipcount.log",'a')
        for files in log_files:
            files_list=os.path.join(os.getcwd()+'\\logs\\'+log_files[iterator])
            with open(files_list, 'r') as files:
                log = files.read()
                my_iplist = re.findall(myregex,log)
                ipcount = Counter(my_iplist)
                for k, v in ipcount.items():
                    var =("IP Address " + "=> " + str(k) + "" + "\tCount "  + "=> " + str(v))
                    print(var, file=ff)
            iterator+=1

            
    if __name__ == '__main__':
        log_reader()
        search()
  
   

    

  
                            
