#!/usr/bin/python
# -*- coding: utf-8 -*-

from app import app, db
from app.models import *
from flask import g, render_template, jsonify, abort, request, make_response, url_for, redirect
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
from flask_bcrypt import Bcrypt
from oauth2client import client, crypt

## for flask login

login_manager = LoginManager()
login_manager.init_app(app)
bcrypt = Bcrypt(app)

@app.route("/")
def index():
    return render_template('/pages/index.html')