from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

app = FastAPI()

templates = Jinja2Templates("./ui")

static_files = StaticFiles(directory="./static")

app.mount("/static", static_files)

@app.get("/")
async def __root(res: Request):
    return templates.TemplateResponse("index.html", {"request": res})

