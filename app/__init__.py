#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Flask
from flask_assets import Environment
from app.assets import bundles
from settings import Config, LocalConfig

app = Flask(__name__, static_url_path='/static', static_folder='static')
app.config.from_object(Config)
app.config.from_object(LocalConfig)

import sys

from flask.json import JSONEncoder as BaseEncoder
from speaklater import _LazyString

class JSONEncoder(BaseEncoder):
    def default(self, o):
        if isinstance(o, _LazyString):
            return str(o)
        return BaseEncoder.default(self, o)

reload(sys)
sys.setdefaultencoding('utf-8')

app.json_encoder = JSONEncoder

from app import views

assets_env = Environment(app)
assets_env.url = app.static_url_path
assets_env.directory = app.static_folder
assets_env.register(bundles)
assets_env.init_app(app)

from app.database import db_session

@app.teardown_request
def shutdown_session(exception=None):
    db_session.remove()