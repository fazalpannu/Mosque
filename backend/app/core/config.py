import os
from dotenv import load_dotenv
from passlib.context import CryptContext

# Load .env files with UTF-8 BOM support so files saved from Windows editors are handled correctly.
load_dotenv(encoding="utf-8-sig")

# Use bcrypt_sha256 to safely hash passwords longer than 72 bytes.
pwd_context = CryptContext(schemes=["bcrypt_sha256"], deprecated="auto")


class Settings:
    database_url: str = os.getenv("DATABASE_URL", "postgresql://postgres:fazal@localhost/mosque_finder")
    jwt_secret: str = os.getenv("JWT_SECRET", "supersecretkey")
    jwt_algorithm: str = os.getenv("JWT_ALGORITHM", "HS256")
    jwt_expires_minutes: int = int(os.getenv("JWT_EXPIRES_MINUTES", "60"))
    admin_email: str = os.getenv("ADMIN_EMAIL", "admin@example.com")
    admin_password: str = os.getenv("ADMIN_PASSWORD", "admin123")

    @property
    def admin_password_hash(self):
        return pwd_context.hash(self.admin_password)


settings = Settings()
