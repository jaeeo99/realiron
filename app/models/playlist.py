
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base

from datetime import datetime

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