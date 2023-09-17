import os
import pinecone
from .chat import chat as chat_blueprint
from .upload import upload as upload_blueprint
from services.chunk_extractor import ChunkExtractor
from pinecone_text.sparse import BM25Encoder
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.chat_models import ChatOpenAI
from flask import Flask


def create_app():
    app = Flask(__name__)

    @app.route('/')
    def home():
        return 'up and running', 200

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

    app.llm_gpt = ChatOpenAI(model_name="gpt-3.5-turbo")
    app.bm25_encoder = BM25Encoder().default()
    app.embedding_model = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
    app.chunk_extractor_service = ChunkExtractor.get_instance()

    return app
