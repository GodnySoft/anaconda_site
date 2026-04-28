from pydantic import BaseModel, EmailStr

class LeadCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    company: str | None = None

class Lead(LeadCreate):
    id: int

    class Config:
        orm_mode = True
