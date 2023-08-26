from flask import current_app
from services.text_processing import TextProcessing
from .pinecone import PineconeService
from services.openai import get_embedding, get_embedding_batches


def insert_content(content, namespace):
    pinecone_service: PineconeService = current_app.pinecone_service
    text_processing: TextProcessing = current_app.text_processing

    text = text_processing.clean_text(content)

    text_chunks = text_processing.chunk(text)

    batches = get_embedding_batches(text_chunks)

    pinecone_service.add_vectors(namespace, batches)


def get_context(question, namespace):
    pinecone_service: PineconeService = current_app.pinecone_service

    query_vectors = get_embedding(question)

    context = pinecone_service.query(namespace, query_vectors, 'specific')

    return context
