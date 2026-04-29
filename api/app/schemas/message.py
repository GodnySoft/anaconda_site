from datetime import datetime

from pydantic import BaseModel, Field


class MessageCreate(BaseModel):
    text: str = Field(..., min_length=1)


class Message(BaseModel):
    id: int
    text: str
    channel_id: int
    created_at: datetime

    class Config:
        orm_mode = True