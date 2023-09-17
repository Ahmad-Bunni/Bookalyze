from apps import create_app
from waitress import serve

app = create_app()


@app.route("/")
def index():
    return 'up and running', 200


if __name__ == "__main__":
    serve(app, host="0.0.0.0", port=5000)
