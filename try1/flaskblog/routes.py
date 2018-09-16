from flask import render_template, url_for, flash, redirect, request, jsonify
from flaskblog import app, db
from flaskblog.forms import Form
from flaskblog.models import User


@app.route('/', methods=['GET', 'POST'])
def index():
    form = Form()
    
    form.user.choices = [(user.id, user.uname) for user in User.query.filter_by(specs='DV').all()]

    if request.method == 'POST':
       
        user = User.query.filter_by(id=form.user.data).first()
        
        return '<h1>Specification: {}, Username: {}</h1>'.format(form.specs.data, user.uname)

    return render_template('index.html', form=form)







@app.route('/user/<specs>')
def user(specs):
    users = User.query.filter_by(specs=specs).all()

    userArray = []

    for userr in users:
        userObj = {}
        userObj['id'] = user.id
        userObj['name'] = user.uname
        userArray.append(userObj)

    return jsonify({'users' : userArray})
