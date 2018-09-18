from flask import Flask, render_template, url_for, flash, redirect
from flask_sqlalchemy import SQLAlchemy
from forms import ViewLogForm
app = Flask(__name__)
app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'
@app.route("/")
@app.route("/home")
def home():
    return render_template('home.html')

if __name__ == '__main__':
    app.run(debug=True)
