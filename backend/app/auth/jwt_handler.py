import logging
from datetime import datetime, timedelta
from jose import JWTError, jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from app.core.config import settings

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/auth/login')
logger = logging.getLogger(__name__)


def create_access_token(subject: str) -> str:
    logger.info("Creating access token for subject=%s", subject)
    expire = datetime.utcnow() + timedelta(minutes=settings.jwt_expires_minutes)
    to_encode = {"sub": subject, "exp": expire}
    return jwt.encode(to_encode, settings.jwt_secret, algorithm=settings.jwt_algorithm)


def verify_token(token: str) -> str:
    try:
        logger.debug("Verifying token")
        payload = jwt.decode(token, settings.jwt_secret, algorithms=[settings.jwt_algorithm])
        subject = payload.get("sub")
        if subject is None:
            logger.warning("Token verification failed: subject missing")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        logger.info("Token verified for subject=%s", subject)
        return subject
    except JWTError:
        logger.warning("Token verification failed: invalid token")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )


def get_current_admin(token: str = Depends(oauth2_scheme)) -> str:
    email = verify_token(token)
    if email != settings.admin_email:
        logger.warning("Admin access denied for email=%s", email)
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Insufficient privileges",
        )
    logger.info("Admin access granted for email=%s", email)
    return email
