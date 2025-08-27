from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from backend.routes.todo_routes import router as todo_router

app = FastAPI()

# include router in main fastAPI
app.include_router(todo_router, prefix="/api/routes", tags=["todos"])

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://localhost:5173", "http://localhost:5173", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get('/')
def read_root():
    return {"Hello": "World"}


@app.get('/health')
def read_health():
    return {"status": "ok",
            "health": "good"}


if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
