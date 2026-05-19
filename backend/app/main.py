from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routers import auth, mosque

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Mosque Finder API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(mosque.router, tags=["mosques"])


@app.get("/")
def root():
    return {"message": "Mosque Finder API"}


@app.get("/health")
def health():
    return {"status": "ok"}
