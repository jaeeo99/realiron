
from sqlalchemy import Column, Integer, String, DateTime

from app.database import Base

from datetime import datetime

class Keyword(Base):
    __tablename__ = 'keyword'

    id = Column(Integer, primary_key=True)

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