from uvicorn import run
from apps import create_app
app = create_app()


@app.get("/")
def index():
    return {"message": "up and running"}


if __name__ == "__main__":
    run(app, host="localhost", port=5000)
