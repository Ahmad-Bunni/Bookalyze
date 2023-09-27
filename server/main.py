from uvicorn import run
from apps import create_app
app = create_app()


@app.get("/")
def index():
    return {"message": "up and running"}


if __name__ == "__main__":
    run("main:app", host="127.0.0.1", port=5000)
