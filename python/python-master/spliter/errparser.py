  

#splitting access
fopen=open("access.log",'r')
tab= ' '
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


#410 file
with open('asplit.log', 'r') as s:
    for line in s:
        if '410' in line:
          ff = open("410.log",'a')
          print(line, file=ff) 
  
  
