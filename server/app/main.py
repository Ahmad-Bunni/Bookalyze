import pinecone
import openai
from fastapi import FastAPI, Response
from pinecone_text.sparse import SpladeEncoder
from langchain.embeddings import HuggingFaceEmbeddings
from app.core.config import configs
from app.routers import routers


class AppCreator:
    def __init__(self):
        self.app = FastAPI()
        self.app.include_router(routers, prefix='/api')

        @self.app.get("/")
        def _():
            return Response("Up and running")

        pinecone.init(
            api_key=configs.PINECONE_API_KEY,
            environment=configs.PINECONE_ENV,
        )

        openai.api_key = configs.OPENAI_API_KEY

        self.app.state.index = pinecone.GRPCIndex(configs.PINECONE_INDEX)
        self.app.state.embedding_model = HuggingFaceEmbeddings(
            model_name="all-MiniLM-L6-v2")
        self.app.state.encoder = SpladeEncoder()


app_creator = AppCreator()
app = app_creator.app
