from pydantic import BaseModel

class ChannelCreate(BaseModel):
    name: str

class Channel(ChannelCreate):
    id: int

    class Config:
        orm_mode = True
