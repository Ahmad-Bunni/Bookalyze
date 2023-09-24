import os
import pinecone
from .chat import chat as chat_blueprint
from .upload import upload as upload_blueprint
from services.chunk_extractor import ChunkExtractor
from langchain.embeddings import HuggingFaceEmbeddings
from pinecone_text.sparse import SpladeEncoder
from flask import Flask


def create_app():
    app = Flask(__name__)

    if os.environ.get('FLASK_ENV') == 'production':
        app.config.from_object('config.ProductionConfig')
    else:
        app.config.from_object('config.DevelopmentConfig')

    app.register_blueprint(chat_blueprint, url_prefix='/api/chat')
    app.register_blueprint(upload_blueprint, url_prefix='/api/upload')

    pinecone.init(
        api_key=app.config['PINECONE_API_KEY'],
        environment=app.config['PINECONE_ENV'],
    )

    app.embedding_model = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
    app.chunk_extractor_service = ChunkExtractor.get_instance()

    return app
