from flask import current_app
from .pinecone import PineconeService
from .utils import clean_text, chunk_text, get_batches


def handle_content(content, namespace):
    pinecone_service = get_pinecone_service()

    cleaned_context = clean_text(content)
    text_array = chunk_text(cleaned_context)

    batches = get_batches(text_array, get_model())

    for batch in batches:
        pinecone_service.add_vectors(namespace, batch)


def handle_question(question, namespace):
    pinecone_service = get_pinecone_service()

    return pinecone_service.query(question, namespace, get_model())


def get_model():
    return current_app.embedding_model


def get_pinecone_service() -> PineconeService:
    return current_app.pinecone_service
