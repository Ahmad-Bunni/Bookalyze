from fastapi import FastAPI, Response
from pinecone import Pinecone

from app.core.config import configs
from app.routers import routers


class AppCreator:
    def __init__(self):
        self.app = FastAPI()
        self.app.include_router(routers, prefix="/api")

        @self.app.get("/")
        def _():
            return Response("Up and running")

        pc = Pinecone(
            api_key=configs.PINECONE_API_KEY,
            environment=configs.PINECONE_ENV,
        )

        self.app.state.index = pc.Index(configs.PINECONE_INDEX)


app_creator = AppCreator()
app = app_creator.app
