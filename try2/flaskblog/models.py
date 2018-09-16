from flaskblog import db
from datetime import datetime



class Userr(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    specs = db.Column(db.String(50))
    uname = db.Column(db.String(50))
