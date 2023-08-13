import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')
    PINECONE_API_KEY = os.environ["PINECONE_API_KEY"]
    PINECONE_ENV = os.environ["PINECONE_ENV"]
    PINECONE_INDEX = os.environ["PINECONE_INDEX"]


class DevelopmentConfig(Config):
    DEBUG = True


class ProductionConfig(Config):
    DEBUG = False
