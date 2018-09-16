from flask import render_template, url_for, flash, redirect, request, jsonify
from flaskblog import app, db
from flaskblog.forms import Form
from flaskblog.models import Userr


@app.route('/', methods=['GET', 'POST'])
def index():
    form = Form()
    form.userr.choices = [(userr.id, userr.uname) for userr in Userr.query.filter_by(specs='DV').all()]

    if request.method == 'POST':
        userr = Userr.query.filter_by(id=form.userr.data).first()
       
        return '<h1>Specification: {}, Username: {}</h1>'.format(form.specs.data, userr.uname)

    return render_template('index.html', form=form)





@app.route('/userr/<specs>')
def userr(specs):
    users = Userr.query.filter_by(specs=specs).all()

    userrArray = []

    for userr in users:
        userrObj = {}
        userrObj['id'] = userr.id
        userrObj['name'] = userr.uname
        userrArray.append(userrObj)

    return jsonify({'users' : userrArray})
