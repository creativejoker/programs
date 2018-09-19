from datetime import datetime
from flaskblog import db, login_manager
from flask_login import UserMixin


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))



class Choice(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    
    
    def __repr__(self):
        return self.name

    

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    image_file = db.Column(db.String(20), nullable=False, default='default.jpg')
    password = db.Column(db.String(60), nullable=False)
    specification = db.Column(db.String(60), nullable=False)
    messages_sent = db.relationship('Task',
                                    foreign_keys='Task.sender_id',
                                    backref='author', lazy='dynamic')
    messages_received = db.relationship('Task',
                                        foreign_keys='Task.recipient_id',
                                        backref='recipient', lazy='dynamic')
   
    def __repr__(self):
        return f"User('{self.username}', '{self.email}', '{self.image_file}','{self.specification}')"



class Task(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    recipient_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    title = db.Column(db.Text(100))
    body = db.Column(db.Text())
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    last_message_read_time = db.Column(db.DateTime)
    final = db.Column(db.Boolean, default=False, nullable=False)
   

    def __repr__(self):
        return f"'{self.title}', '{self.body}'"

    
        
class MyTask(db.Model, UserMixin):
	id = db.Column(db.Integer, primary_key=True)
	body = db.Column(db.Text())
	user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

	def __repr__(self):
		return f"'{self.body}'"