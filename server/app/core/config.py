from dotenv import load_dotenv
from pydantic_settings import BaseSettings


class Configs(BaseSettings):
    TOGETHER_API_KEY: str
    PINECONE_API_KEY: str
    PINECONE_ENV: str
    PINECONE_INDEX: str
    DEBUG: bool = False

    class Config:
        env_file = ".env"
        load_dotenv()


configs = Configs()
