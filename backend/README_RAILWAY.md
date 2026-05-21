# Deploying `backend` to Railway

Steps to deploy this FastAPI app to Railway (two options: GitHub deploy or Docker):

1. Create a Railway project
   - Go to https://railway.app and create a new project.

2. Deploy from GitHub (recommended)
   - Connect your GitHub repo and choose the repository that contains this project.
   - When prompted for a project path, set it to `backend` so Railway builds from this folder.
   - Railway will detect Python; if not, set the Start Command to use the Procfile or set the command:
     `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

3. Or deploy with Docker
   - Railway will use the `Dockerfile` present in `backend/` automatically if you choose Docker deploy.

4. Environment variables (do NOT commit `.env` to Git)
   - In the Railway project settings, add the following variables (copy values from your local `.env` or generate secrets):
     - `DATABASE_URL` (Postgres connection string)
     - `JWT_SECRET`
     - `JWT_ALGORITHM` (e.g. `HS256`)
     - `JWT_EXPIRES_MINUTES`
     - `ADMIN_EMAIL`
     - `ADMIN_PASSWORD`

5. Database
   - If using Railway Postgres, create a Postgres plugin and copy the provided `DATABASE_URL` into the environment variable above.
   - Alternatively keep using your existing database (Neon) by setting `DATABASE_URL` to that connection string.

6. Ports and start command
   - Railway exposes your service on the port provided in `$PORT`. The included `Procfile` and `Dockerfile` use `$PORT`.

7. Verify
   - After deploy, view logs on Railway and test the open URL. Locally you can run:

```
pip install -r backend/requirements.txt
uvicorn app.main:app --reload --port 8000
```

Files added to support deployment:
- [backend/Procfile](backend/Procfile)
- [backend/Dockerfile](backend/Dockerfile)
- [backend/.dockerignore](backend/.dockerignore)

If you want, I can: link the repo to Railway, create a Docker build pipeline, or add CI (GitHub Actions) to auto-deploy on push.
