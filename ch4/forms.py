from flask_wtf import FlaskForm
from wtforms import  SubmitField

class ViewLogForm(FlaskForm):
    submit = SubmitField('View Logs')




