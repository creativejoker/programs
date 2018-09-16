from flask_wtf import FlaskForm 
from wtforms import SelectField
from flaskblog.models import User

class Form(FlaskForm):
    
    specs = SelectField('specs', choices=[('DV', 'Development'), ('TS', 'Testing')]) 
    user = SelectField('user', choices=[])



    
