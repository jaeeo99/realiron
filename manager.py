#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask_script import Manager, Server
from flask_migrate import MigrateCommand
from flask_assets import ManageAssets

from app import app, assets_env

manager = Manager(app)

manager.add_command('db', MigrateCommand)
manager.add_command("runserver", Server(host='0.0.0.0', port=5050, threaded=True))
manager.add_command("assets", ManageAssets(assets_env))

if __name__ == '__main__':
    manager.run()
