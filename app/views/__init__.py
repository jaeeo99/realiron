#!/usr/bin/python
# -*- coding: utf-8 -*-

from app import app
from app.models import *
from app.database import db_session
from flask import Blueprint, render_template, jsonify, abort, request, make_response, url_for, redirect
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from flask_bcrypt import Bcrypt

## for flask login

login_manager = LoginManager()
login_manager.init_app(app)
bcrypt = Bcrypt(app)

@login_manager.user_loader
def user_loader(user_id):
    return User.query.get(user_id)

# @login_manager.unauthorized_handler
# def unauthorized():
#     return redirect(url_for('index'))

@app.route("/api/login/fb", methods=["POST"])
def fb_login():
    data = request.get_json()
    fb_id = data.get("fb_id")
    name = data.get("name")
    user = User.query.filter_by(fb_id=fb_id, name=name).first()
    if user is None:
        return register(fb_id, name)
    return make_response(jsonify({'register':False, 'user':login(user)}), 200)

def register(fb_id, name):
    user = User(fb_id, name);
    return make_response(jsonify({'register':True, 'user':login(user)}), 200)

def login(user):
    user.authenticated = True
    db_session.add(user)
    db_session.commit()
    login_user(user)
    return user.name

@login_required
def logout():
    user = current_user
    user.authenticated = False
    db_session.add(user)
    db_session.commit()
    logout_user()
    return make_response(jsonify({'message': "success"}), 200)

@app.route("/")
def index():
    return render_template('/pages/index.html')

@app.route("/music")
def music():
    return render_template('/pages/music.html')

@app.route("/test")
def test():
    return render_template('/pages/test.html')

## for error pages
@app.errorhandler(404)
def page_not_found(e):
    return render_template('/errors/page-404.html'), 404