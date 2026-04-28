from fastapi import FastAPI, Depends, WebSocket
from sqlalchemy.orm import Session

from . import models, schemas
from .core.db import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/api/v1/health")
def health():
    return {"status": "ok"}


@app.post("/api/v1/leads", response_model=schemas.Lead)
def create_lead(lead: schemas.LeadCreate, db: Session = Depends(get_db)):
    db_lead = models.Lead(**lead.dict())
    db.add(db_lead)
    db.commit()
    db.refresh(db_lead)
    return db_lead


@app.get("/api/v1/channels", response_model=list[schemas.Channel])
def read_channels(db: Session = Depends(get_db)):
    return db.query(models.Channel).all()


@app.post("/api/v1/channels", response_model=schemas.Channel)
def create_channel(channel: schemas.ChannelCreate, db: Session = Depends(get_db)):
    db_channel = models.Channel(**channel.dict())
    db.add(db_channel)
    db.commit()
    db.refresh(db_channel)
    return db_channel


@app.get("/api/v1/channels/{channel_id}/messages", response_model=list[schemas.Message])
def read_messages(channel_id: int, db: Session = Depends(get_db)):
    return db.query(models.Message).filter(models.Message.channel_id == channel_id).all()


@app.websocket("/ws/{channel_id}")
async def websocket_endpoint(websocket: WebSocket, channel_id: int, db: Session = Depends(get_db)):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        message = schemas.MessageCreate(text=data)
        db_message = models.Message(**message.dict(), channel_id=channel_id)
        db.add(db_message)
        db.commit()
        db.refresh(db_message)
        await websocket.send_text(f"Message text was: {data}")

@app.post("/api/v1/chatbot")
def chatbot(prompt: str):
    return {"response": f"This is a dummy response to: {prompt}"}
