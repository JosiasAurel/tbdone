from fastapi import FastAPI, Response
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

app = FastAPI()

templates = Jinja2Templates("ui")

static_files = StaticFiles(directory="static")

@app.get("/")
async def __root(res: Response):
    templates.TemplateResponse("index", {"response": res})

