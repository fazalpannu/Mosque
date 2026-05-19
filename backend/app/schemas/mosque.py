from pydantic import BaseModel
from datetime import datetime


class MosqueBase(BaseModel):
    name: str
    city: str
    address: str
    imam_name: str
    prayer_time: str


class MosqueCreate(MosqueBase):
    pass


class MosqueUpdate(MosqueBase):
    pass


class Mosque(MosqueBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
