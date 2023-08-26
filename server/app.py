from flask import Flask
from apps.chat import chat as chat_blueprint
from apps.upload import upload as upload_blueprint
from config import DevelopmentConfig
from services.pinecone import PineconeService
from services.text_processing import TextProcessing


def create_app(config_class=DevelopmentConfig):
    app = Flask(__name__)
    app.config.from_object(config_class)

    app.register_blueprint(chat_blueprint, url_prefix='/api')
    app.register_blueprint(upload_blueprint, url_prefix='/api')

    api_key = app.config['PINECONE_API_KEY']
    env = app.config['PINECONE_ENV']
    index_name = app.config['PINECONE_INDEX']
    app.pinecone_service = PineconeService.get_instance(
        api_key, env, index_name)

    app.text_processing = TextProcessing.get_instance()

    return app


if __name__ == '__main__':
    app = create_app()
    app.run()
