import os
import secrets
from PIL import Image
from flask import render_template, url_for, flash, redirect, request, abort
from flaskblog import app, db, bcrypt
from flaskblog.forms import RegistrationForm, LoginForm,RequestResetForm,ResetPasswordForm,UpdateAccountForm, TaskForm, MyTask1, RejectForm
from flaskblog.models import User, Task, MyTask, Reject 
from flask_login import login_user, current_user, logout_user, login_required
from flask_socketio import SocketIO, emit

socketio = SocketIO( app )




@app.route("/")
@app.route("/register", methods=['GET', 'POST'])
def register():
    request_data = request.form
    if current_user.is_authenticated:
        return redirect(url_for('login'))
    form = RegistrationForm()
    print(form)

    #if frequest_data.validate_on_submit():
    if request_data:
       
        print('\n',request_data['specification'],'\n')
        hashed_password = bcrypt.generate_password_hash(request_data['password']).decode('utf-8')
        user = User(username=request_data['username'], email=request_data['email'], password=hashed_password,specification=request_data['specification'])
        db.session.add(user)
        db.session.commit()
        flash('Your account has been created! You are now able to log in', 'success')
        return redirect(url_for('login'))
    return render_template('register.html', title='Register', form=form)



@app.route("/login", methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user, remember=form.remember.data)
            next_page = request.args.get('next')
            return redirect(next_page) if next_page else redirect(url_for('home'))
        else:
            flash('Login Unsuccessful. Please check email and password', 'danger')
    return render_template('login.html', title='Login', form=form)



@app.route("/home")
@login_required
def home():
    #params = []
    if request.args.get('spec'):
        users = User.query.filter_by(specification=request.args.get('spec'))
    else:
        users = User.query.all()
    return render_template('home.html', title='Home', users=users)



@app.route("/mytask")
@login_required
def mytask():
    return render_template('mytask.html', title='My Task')



@app.route("/assigntask")
@login_required
def assigntask():
    return render_template('assigntask.html', title='Assign Task')




@app.route( '/ChatApp' )
def ChatApp():
  return render_template( './ChatApp.html' )

def messageRecived():
  print( 'message was received!!!' )


@socketio.on( 'my event' )
def handle_my_custom_event( json ):
   # import pdb;pdb.set_trace()
    print( 'recived my event: ' + str( json ) )
    socketio.emit( 'my response', json, callback=messageRecived )



def send_reset_email(user):
    token = user.get_reset_token()
    msg = Message('Password Reset Request',
                  sender='noreply@demo.com',
                  recipients=[user.email])
    msg.body = f'''To reset your password, visit the following link:
{url_for('reset_token', token=token, _external=True)}
If you did not make this request then simply ignore this email and no changes will be made.
'''
    mail.send(msg)



@app.route("/reset_password", methods=['GET', 'POST'])
def reset_request():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    form = RequestResetForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        send_reset_email(user)
        flash('An email has been sent with instructions to reset your password.', 'info')
        return redirect(url_for('login'))
    return render_template('reset_request.html', title='Reset Password', form=form)


@app.route("/reset_password/<token>", methods=['GET', 'POST'])
def reset_token(token):
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    user = User.verify_reset_token(token)
    if user is None:
        flash('That is an invalid or expired token', 'warning')
        return redirect(url_for('reset_request'))
    form = ResetPasswordForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        user.password = hashed_password
        db.session.commit()
        flash('Your password has been updated! You are now able to log in', 'success')
        return redirect(url_for('login'))
    return render_template('reset_token.html', title='Reset Password', form=form)



@app.route("/logout")
def logout():
    logout_user()
    return redirect(url_for('home'))



@app.route("/task")
@login_required
def task():
        form=TaskForm()
        return render_template('task.html', title='Assign Task', form=form, recipient_user=request.args.get('user'))







def save_picture(form_picture):
    random_hex = secrets.token_hex(8)
    _, f_ext = os.path.splitext(form_picture.filename)
    picture_fn = random_hex + f_ext
    picture_path = os.path.join(app.root_path, 'static/profile_pics', picture_fn)

    output_size = (125, 125)
    i = Image.open(form_picture)
    i.thumbnail(output_size)
    i.save(picture_path)

    return picture_fn



  
@app.route("/account", methods=['GET', 'POST'])
@login_required
def account():
    form = UpdateAccountForm()
    if form.validate_on_submit():
        if form.picture.data:
            picture_file = save_picture(form.picture.data)
            current_user.image_file = picture_file
        current_user.username = form.username.data
        current_user.email = form.email.data
        db.session.commit()
        flash('Your account has been updated!', 'success')
        return redirect(url_for('account'))
    elif request.method == 'GET':
        form.username.data = current_user.username
        form.email.data = current_user.email
    image_file = url_for('static', filename='profile_pics/' + current_user.image_file)
    return render_template('account.html', title='Account',
                           image_file=image_file, form=form)


@app.route('/sendtask/<recipient>', methods=['GET', 'POST'])
@login_required
def send_task(recipient):
    request_data = request.form
    user = User.query.filter_by(username=recipient).first_or_404()
    form = TaskForm()
    if request_data:
        print(request_data)
        msg = Task(author=current_user, recipient=user,title=request_data['title'],
                      body=request_data['body'])
        db.session.add(msg)
        db.session.commit()
        flash('Your message has been sent.')
        return redirect(url_for('home', username=recipient))
    return render_template('task.html', title=('Send Message'),
                           form=form, recipient=recipient)




@app.route("/user_task")
@login_required
def user_task():
    #user = User.query.filter_by(user=current_user).first()
    tasks = Task.query.filter_by(recipient_id=current_user.id).all()
    return render_template('user_task.html', title='Task', tasks=tasks)




			
		
@app.route("/tracktask")
@login_required
def tracktask():
	tracktask=MyTask.query.all()
	reject=Reject.query.all()
	return render_template('tracktask.html', title='Task', tracktask=tracktask, reject=reject)
	
	

	
        
@app.route("/user_task/accept", methods=['GET', 'POST'])
@login_required
def accept():
	request_data = request.form
	form = MyTask1()
	if request_data:
		accept = MyTask(body=request_data['body'], user_id=current_user.id)
		db.session.add(accept)
		db.session.commit()
		flash('your response is saved')
		return redirect(url_for('home'))
	return render_template('mytask1.html', title='Accept', form=form)




@app.route("/user_task/reject", methods=['GET', 'POST'])
@login_required
def reject():
	request_data = request.form
	form = RejectForm()
	if request_data:
		reject = Reject(body=request_data['body'], user_id=current_user.id)
		db.session.add(reject)
		db.session.commit()
		flash('your response is saved')
		return redirect(url_for('home'))
	return render_template('rejectform.html', title='Reject', form=form)



	
	

        

@app.route("/task/<int:task_id>/delete", methods=['GET', 'POST'])
@login_required
def delete_post(task_id):
    task = Task.query.get(task_id)
    #if task.author != current_user:
        
    db.session.delete(task)
    db.session.commit()
    flash('Your task has been deleted!', 'success')
    return redirect(url_for('home'))  
	
	
		
	


