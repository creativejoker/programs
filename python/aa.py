
#fopen=open("error.log","r")
#for x in fopen:
    #if 'tid' in x:

infile =open("r.log","r")

important = []
keep_phrases = ["tid"]

with infile as f:
    f = f.readlines()

for line in f:
    for phrase in keep_phrases:
        if phrase in line:
            important.append(line)
            break

print(important)
        


