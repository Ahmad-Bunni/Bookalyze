from fastapi import FastAPI, Response
from langchain_community.embeddings import OllamaEmbeddings
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

        Pinecone(api_key=configs.PINECONE_API_KEY)

        self.app.state.index = configs.PINECONE_INDEX
        self.app.state.embedding_model = OllamaEmbeddings(model="")


app_creator = AppCreator()
app = app_creator.app
