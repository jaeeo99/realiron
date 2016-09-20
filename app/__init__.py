#!/usr/bin/python
# -*- coding: utf-8 -*-
import sys
from app import assets
import settings
from flask import Flask
from flask_assets import Environment

from flask.json import JSONEncoder as BaseEncoder
from speaklater import _LazyString

class JSONEncoder(BaseEncoder):
    def default(self, o):
        if isinstance(o, _LazyString):
            return str(o)
        return BaseEncoder.default(self, o)

reload(sys)
sys.setdefaultencoding('utf-8')

app = Flask(__name__, static_url_path='/static', static_folder='static')
app.config.from_object(settings.Config)
app.config.from_object(settings.LocalConfig)
app.json_encoder = JSONEncoder

from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy(app)
migrate = Migrate(app, db)


from app import views

assets_env = Environment(app)
assets_env.url = app.static_url_path
assets_env.directory = app.static_folder

assets_env.register(assets.bundles)

assets_env.init_app(app)