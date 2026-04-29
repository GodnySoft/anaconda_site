from sqlalchemy import Boolean, Column, DateTime, Integer, String, func

from .base import Base


class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    company = Column(String(255), nullable=True)
    contact = Column(String(255), nullable=False, index=True)
    message = Column(String(2000), nullable=False)
    consent = Column(Boolean, nullable=False, default=False)
    source_page = Column(String(100), nullable=False, index=True)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())