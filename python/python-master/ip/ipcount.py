import re
from collections import Counter

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
  apache_log_reader("access.log")
  
