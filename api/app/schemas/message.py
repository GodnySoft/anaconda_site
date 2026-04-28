from pydantic import BaseModel

class MessageCreate(BaseModel):
    text: str

class Message(MessageCreate):
    id: int
    channel_id: int

    class Config:
        orm_mode = True
