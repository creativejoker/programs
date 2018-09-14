from flaskblog import app
from flask import render_template




@app.errorhandler(404)
def error404(error):
    return '<h1>Page not found! Check and try again. Have a good day !</h1>', 404

@app.errorhandler(500)
def error500(error):
    return '<h1>Error 500 !!!</h1>', 500

if __name__=='__main__':
    app.run(debug=False)
    

'''@app.errorhandler(500)
def error500(error):
    return '<h1>Error 500 !!!</h1>', 500'''


'''if __name__ == '__main__':
    app.run(debug=True)'''
