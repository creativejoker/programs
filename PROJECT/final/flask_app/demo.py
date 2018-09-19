import os
import re
from datetime import datetime
from collections import Counter
from flask import Flask, render_template, request
 
app = Flask(__name__)
@app.route('/')
@app.route('/content')
def content():
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
        
        return render_template('content.html')

@app.route('/content2', methods=['GET', 'POST'])
def my_form_post():
        iterr=0
        text = request.form['text']
        log_files=os.listdir('logs')
        print("Total No of Log_files Parsed:",len(log_files))
        datestring = datetime.strftime(datetime.now(), '%Y_%m_%d_%H_%M')
        new_file= open(f'{text}_{datestring}.log', 'a+')
        for files in log_files:
            files_list=os.path.join(os.getcwd()+'\\logs\\'+log_files[iterr])
            with open(files_list, 'r') as files:
                for line in files:
                    if text in line:
                        print(line, file=new_file)
            iterr+=1
        text_2 = open('ip_2018_09_19_13_20.log', 'r+')
        content2 = text_2.read()
        #text.close()
        return render_template('content2.html', text_2=content2)
       


@app.route('/content1')
def content1():
        text = open('ipcount.log', 'r+')
        content1 = text.read()
        return render_template('content1.html', text=content1)


        
if __name__ == '__main__':
	app.run(debug=True)
	
	
