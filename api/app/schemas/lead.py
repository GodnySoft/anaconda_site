from datetime import datetime

from pydantic import BaseModel, Field


class LeadCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    company: str | None = Field(default=None, max_length=255)
    contact: str = Field(..., min_length=3, max_length=255)
    message: str = Field(..., min_length=10, max_length=2000)
    consent: bool
    source_page: str = Field(..., min_length=1, max_length=100)


class Lead(BaseModel):
    id: int
    name: str
    company: str | None
    contact: str
    message: str
    consent: bool
    source_page: str
    created_at: datetime

    class Config:
        orm_mode = True