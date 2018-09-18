import os

import re

from datetime import datetime

from collections import Counter



class Logging:

    def search():

        x=0

        

        var1=os.listdir('logs')

        ln=len(var1)

        print("Total No of Log_files Parsed:",ln)

        get=input("Enter keyword to search: ")

        while(x<ln):

            li=os.path.join(os.getcwd()+'\\logs\\'+var1[x])

            #for (dirpath, dirnames, filenames) in walk(li):

                #f.extend(filenames)

                #if li in open('example.txt').read():

                #print("true")

            with open(li, 'r') as s:

                for line in s:

                    if get in line:

                        #ff = open("keywords.log",'a+')

                        datestring = datetime.strftime(datetime.now(), '%Y_%m_%d_%H_%M')

                        print(datestring)

                        ff= open(f'keyword_{datestring}.log', 'a+')

                        print(line, file=ff)

                x+=1

          

            



            

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

fopen=open("access.log",'r')

fmd;ltab= ' '

for x in fopen:

  if x==tab:

    x.append("\n")

  ff = open("asplit.log",'a')

  print(x, file=ff)

  

#splitting error

fopen=open("error.log",'r')

tab= ' '

for x in fopen:

  if x==tab:

    x.append("\n")

  ff = open("ersplit.log",'a')

  print(x, file=ff)    

          '''

  
