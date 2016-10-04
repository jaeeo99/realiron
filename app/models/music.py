from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from app.database import Base
from datetime import datetime

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