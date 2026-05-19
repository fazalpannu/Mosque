from sqlalchemy import Column, Integer, String, DateTime, func
from app.database import Base


class Mosque(Base):
    __tablename__ = "mosques"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    city = Column(String, nullable=False)
    address = Column(String, nullable=False)
    imam_name = Column(String, nullable=False)
    prayer_time = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
