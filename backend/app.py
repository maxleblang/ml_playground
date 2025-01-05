from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models import modelJSON
from model_processing import generate_notebook_from_JSON

app = FastAPI()

origins = [
    "http://localhost:8000",
    "localhost:8000",
    "http://localhost:5173",
    "localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.post("/model_json/")
async def model_json(model_JSON: modelJSON) -> None:
    model_script = generate_notebook_from_JSON(model_JSON)
    print(model_script)
