#!/usr/bin/python
# -*- coding: utf-8 -*-
from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime

__all__ = [
    'User',
    'Keyword',
    'Playlist',
    'Music'
]

class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    name = Column(String(32))

    fb_id = Column(String(32))

    created = Column(DateTime)
    modified = Column(DateTime)
    authenticated = Column(Boolean, default=False)

    playlists = relationship('Playlist', backref='user', lazy='dynamic', cascade="all, delete, delete-orphan")
    keywords = relationship('Keyword', backref='user', lazy='dynamic', cascade="all, delete, delete-orphan")

    def __init__(self, fb_id, name):
        self.fb_id = fb_id
        self.name = name

        self.created = datetime.now()
        self.modified = datetime.now()

        self.playlists = []
        self.keywords = []

    def __repr__(self):
        return '<User %r>' % self.name

    @property
    def serialize(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def get_id(self):
        return unicode(self.id)

    def is_active(self):
        return True

    def is_authenticated(self):
        return self.authenticated

    def is_anonymous(self):
        return False

class Playlist(Base):
    __tablename__ = 'playlist'

    id = Column(Integer, primary_key=True)
    name = Column(String(32))

    user_id = Column(Integer, ForeignKey('user.id'))

    created = Column(DateTime)
    modified = Column(DateTime)

    musics = relationship('Music', backref='playlist', lazy='dynamic', cascade="all, delete, delete-orphan")

    def __init__(self, name):
        self.name = name

        self.created = datetime.now()
        self.modified = datetime.now()

        self.musics = []

    def __repr__(self):
        return '<Playlist %r>' % self.name

    @property
    def serialize(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class Music(Base):
    __tablename__ = 'music'

    id = Column(Integer, primary_key=True)

    playlist_id = Column(Integer, ForeignKey('playlist.id'))

    yt_id = Column(String(32))
    name = Column(String(32))
    keyword = Column(String(32))

    created = Column(DateTime)
    modified = Column(DateTime)

    def __init__(self, yt_id, name, keyword):
        self.yt_id = yt_id

        self.name = name
        self.keyword = keyword

        self.created = datetime.now()
        self.modified = datetime.now()

    def __repr__(self):
        return '<Music %r>' % self.name

    @property
    def serialize(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class Keyword(Base):
    __tablename__ = 'keyword'

    id = Column(Integer, primary_key=True)

    user_id = Column(Integer, ForeignKey('user.id'))

    keyword = Column(String(32))

    created = Column(DateTime)
    modified = Column(DateTime)

    def __init__(self, keyword):
        self.keyword = keyword

        self.created = datetime.now()
        self.modified = datetime.now()

    def __repr__(self):
        return '<Keyword %r>' % self.keyword

    @property
    def serialize(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}