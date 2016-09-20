#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask_assets import Bundle

bundles = {
    'temp_js' : Bundle(
        # For bootstrap, angularjs
        'js/lib/boostrap.min.js',
        'js/lib/ui-bootstrap-tpls.min.js',
        'js/lib/sortable.min.js',
        'js/lib/angular-cookies.min.js',
        'js/lib/angular-sanitize.min.js',

        # For password encrypt
        'js/lib/sha256.js',

        output='gen/realiron.js',
        filters='jsmin'),

    'temp_css' : Bundle(
        # For bootstrap
        'css/lib/boostrap.css',
        'css/lib/font_awesome.css',

        output='gen/realiron.css',
        filters='cssmin'),
}
