from flaskblog import app
from flask import render_template
from flask_socketio import SocketIO, emit

socketio = SocketIO( app )
#if __name__=='__main__':
    #app.run(debug=True)
    
if __name__ == '__main__':
  socketio.run( app, debug = True )
