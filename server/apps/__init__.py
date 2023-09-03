import os
from flask import Flask
from .chat import chat as chat_blueprint
from .upload import upload as upload_blueprint
from services.text_processing import TextProcessing
from services.pinecone import PineconeService


def create_app():
    app = Flask(__name__)
    if os.environ.get('FLASK_ENV') == 'production':
        app.config.from_object('config.ProductionConfig')
    else:
        app.config.from_object('config.DevelopmentConfig')

    app.register_blueprint(chat_blueprint, url_prefix='/api/chat')
    app.register_blueprint(upload_blueprint, url_prefix='/api/upload')

    api_key = app.config['PINECONE_API_KEY']
    env = app.config['PINECONE_ENV']
    index_name = app.config['PINECONE_INDEX']

    app.pinecone_service = PineconeService.get_instance(
        api_key, env, index_name)
    app.text_processing_service = TextProcessing.get_instance()

    return app
