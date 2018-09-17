import os
import re
from collections import Counter

class Logging:
    def search():
        while True:
              try:
                x=0
                strv=''
                var1=os.listdir('logs')
                ln=len(var1)
                print("Total No of Log_files Parsed:",ln)
                get=input("Enter keyword to search: ")
                while(x<ln):
                    li=os.path.join(os.getcwd()+'\\logs\\'+var1[x])
                    with open(li, 'r') as s:
                        for line in s:
                            if get in line:
                                ff = open("keywords.log",'a+')
                                print(line, file=ff)
                    x+=1
              except Exception as e:
                   print("No such keyword",str(e))

            
    def apache_log_reader(logfile):
      myregex = r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}'
      with open(logfile) as f:
        log = f.read()
        my_iplist = re.findall(myregex,log)
        ipcount = Counter(my_iplist)
        for k, v in ipcount.items():
          var =("IP Address " + "=> " + str(k) + " " + "Count "  + "=> " + str(v))
          #print(var)
          ff = open("ipcount.log",'a')
          print(var, file=ff)

      
    if __name__ == '__main__':
      apache_log_reader("logs/access.log")
      search()
  
   

    
'''
#splitting access

  
#splitting error
fopen=open("error.log",'r')
tab= ' '
for x in fopen:
  if x==tab:
    x.append("\n")
  ff = open("ersplit.log",'a')
  print(x, file=ff)    



          '''
  
                                                                                                                                                                                                                                                
