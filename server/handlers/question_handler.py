from flask import current_app
from services.pinecone import PineconeService
from services.openai import get_embedding


def get_context(question, namespace):
    pinecone_service: PineconeService = current_app.pinecone_service

    query_vectors = get_embedding(question)

    context = pinecone_service.query(namespace, query_vectors)

    return context
