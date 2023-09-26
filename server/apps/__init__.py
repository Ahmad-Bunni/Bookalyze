import openai
import pinecone
from .upload import router as upload_router
from .chat import router as chat_router
from fastapi import FastAPI
from pinecone_text.sparse import SpladeEncoder
from langchain.embeddings import HuggingFaceEmbeddings
from services.chunk_extractor import ChunkExtractor
from .config import Settings
settings = Settings()


def create_app() -> FastAPI:
    app = FastAPI()

    app.include_router(chat_router, prefix='/api/chat')
    app.include_router(upload_router, prefix='/api/upload')

    pinecone.init(
        api_key=settings.PINECONE_API_KEY,
        environment=settings.PINECONE_ENV,
    )

    openai.api_key = settings.OPENAI_API_KEY

    app.state.index = pinecone.Index("default")
    app.state.embedding_model = HuggingFaceEmbeddings(
        model_name="all-MiniLM-L6-v2")
    app.state.chunk_extractor_service = ChunkExtractor.get_instance()
    app.state.encoder = SpladeEncoder()
    return app
