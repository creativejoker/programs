from flask_wtf import FlaskForm 
from wtforms import SelectField
from flaskblog.models import Userr

class Form(FlaskForm):
    


    specs = SelectField('specs', choices=[('DV', 'Development'), ('TS', 'Testing')]) 
    userr = SelectField('user', choices=[])



    
