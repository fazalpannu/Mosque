import logging

from fastapi import APIRouter, HTTPException, status
from passlib.context import CryptContext
from app.core.config import settings
from app.schemas.token import Token
from app.schemas.user import UserLogin
from app.auth.jwt_handler import create_access_token

router = APIRouter()
logger = logging.getLogger(__name__)

pwd_context = CryptContext(schemes=["bcrypt_sha256"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


@router.post("/login", response_model=Token)
def login(payload: UserLogin):
    logger.info("Login attempt for email=%s", payload.email)
    if payload.email != settings.admin_email:
        logger.warning("Login failed: invalid email=%s", payload.email)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    if not verify_password(payload.password, settings.admin_password_hash):
        logger.warning("Login failed: invalid password for email=%s", payload.email)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    token = create_access_token(subject=payload.email)
    logger.info("Login successful for email=%s", payload.email)
    return {"access_token": token, "token_type": "bearer"}
