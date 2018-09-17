from flaskblog import app
from flask import render_template
import os
from flaskblog.models import User, Post, Notification, Message



@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User': User, 'Post': Post, 'Message': Message,
            'Notification': Notification}



#app.config['SECRET_KEY'] = 'hard to guess string'
#app.config['SQLALCHEMY_DATABASE_URI'] =\
    #'sqlite:///' + os.path.join(basedir, 'data.sqlite')
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True


app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'





if __name__=='__main__':
    app.run(debug=True)
    

