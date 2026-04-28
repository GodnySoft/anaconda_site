from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .lead import Base

class Channel(Base):
    __tablename__ = "channels"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)

    messages = relationship("Message", back_populates="channel")

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String)
    channel_id = Column(Integer, ForeignKey("channels.id"))

    channel = relationship("Channel", back_populates="messages")
