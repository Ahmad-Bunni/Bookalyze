from pydantic_settings import BaseSettings
from dotenv import load_dotenv


class Configs(BaseSettings):
    OPENAI_API_KEY: str
    PINECONE_API_KEY: str
    PINECONE_ENV: str
    PINECONE_INDEX: str
    DEBUG: bool = False

    class Config:
        env_file = '.env'
        load_dotenv()


configs = Configs()
