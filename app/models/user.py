from sqlalchemy import Column, Integer, String, DateTime, Boolean
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime

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

    def __init__(self, name, fb_id):
        self.name = name
        self.fb_id = fb_id

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
