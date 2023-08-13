from operator import index
from flask import Flask
import pinecone
from apis.chat import chat as chat_blueprint
from config import DevelopmentConfig
from services.pinecone import PineconeService
from services.embeddings import embedding_model


def load_pinecone_index(api_key, env, index_name) -> pinecone.Index:
    pinecone.init(api_key=api_key,
                  environment=env)

    if not index_name in pinecone.list_indexes():
        raise KeyError(f"Index '{index_name}' does not exist.")
    index = pinecone.Index(index_name)

    return index


def create_app(config_class=DevelopmentConfig):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Register blueprints
    app.register_blueprint(chat_blueprint, url_prefix='/api')

    api_key = app.config['PINECONE_API_KEY']
    env = app.config['PINECONE_ENV']
    index_name = app.config['PINECONE_INDEX']

    app.pinecone_service: PineconeService = PineconeService(
        index=load_pinecone_index(api_key, env, index_name))

    app.embedding_model = embedding_model()

    return app


if __name__ == '__main__':
    app = create_app()
    app.run()
