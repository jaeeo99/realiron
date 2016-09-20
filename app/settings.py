#!/usr/bin/python
# -*- coding: utf-8 -*-
__all__ = ["Config", "ProdConfig", "DevConfig", "LocalConfig"]

class Config(object):
    SECRET_KEY = 'kr.jaeeo.realiron'

    WTF_CSRF_ENABLED = True


class ProdConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://root@localhost/realiron'

class DevConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://root@localhost/realiron'

class LocalConfig(Config):
    DEBUG = True
    ASSETS_DEBUG=True
    SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://root@localhost/realiron'
    SQLALCHEMY_ECHO = True
