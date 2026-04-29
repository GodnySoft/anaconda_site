from datetime import datetime

from pydantic import BaseModel, Field


class ChannelCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)


class Channel(BaseModel):
    id: int
    name: str
    created_at: datetime

    class Config:
        orm_mode = True