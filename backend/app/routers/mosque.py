from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.mosque import Mosque
from app.schemas.mosque import Mosque as MosqueSchema, MosqueCreate, MosqueUpdate
from app.auth.jwt_handler import get_current_admin

router = APIRouter()


@router.get("/mosques", response_model=List[MosqueSchema])
def read_mosques(db: Session = Depends(get_db)):
    return db.query(Mosque).order_by(Mosque.created_at.desc()).all()


@router.get("/mosques/{mosque_id}", response_model=MosqueSchema)
def read_mosque(mosque_id: int, db: Session = Depends(get_db)):
    mosque = db.query(Mosque).filter(Mosque.id == mosque_id).first()
    if mosque is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Mosque not found")
    return mosque


@router.post("/mosques", response_model=MosqueSchema, status_code=status.HTTP_201_CREATED, dependencies=[Depends(get_current_admin)])
def create_mosque(mosque_in: MosqueCreate, db: Session = Depends(get_db)):
    mosque = Mosque(**mosque_in.dict())
    db.add(mosque)
    db.commit()
    db.refresh(mosque)
    return mosque


@router.put("/mosques/{mosque_id}", response_model=MosqueSchema, dependencies=[Depends(get_current_admin)])
def update_mosque(mosque_id: int, mosque_in: MosqueUpdate, db: Session = Depends(get_db)):
    mosque = db.query(Mosque).filter(Mosque.id == mosque_id).first()
    if mosque is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Mosque not found")
    for field, value in mosque_in.dict().items():
        setattr(mosque, field, value)
    db.commit()
    db.refresh(mosque)
    return mosque


@router.delete("/mosques/{mosque_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(get_current_admin)])
def delete_mosque(mosque_id: int, db: Session = Depends(get_db)):
    mosque = db.query(Mosque).filter(Mosque.id == mosque_id).first()
    if mosque is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Mosque not found")
    db.delete(mosque)
    db.commit()
    return None
