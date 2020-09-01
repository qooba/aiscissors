from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from common import Bootstapper
from routers import scissors

app = FastAPI()
container=Bootstapper().bootstrap()
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/", response_class=HTMLResponse)
async def homepage(include_in_schema=False):
    return FileResponse("static/index.html")

app.include_router(scissors.router, tags=['images'])
