from io import BytesIO
from flask import current_app
from services.text_processing import TextProcessing
from services.pinecone import PineconeService
from services.openai import get_embedding_batches


def process_file(file, namespace):
    text_processing_service: TextProcessing = current_app.text_processing_service

    stream = BytesIO(file.read())

    chunks = text_processing_service.get_chunks_file(stream)

    get_embeddings_store_vectors(chunks, namespace)


def process_text(text, namespace):
    text_processing_service: TextProcessing = current_app.text_processing_service

    chunks = text_processing_service.get_chunks_text(text)

    get_embeddings_store_vectors(chunks, namespace)


def get_embeddings_store_vectors(chunks, namespace):
    pinecone_service: PineconeService = current_app.pinecone_service

    filtered_chunks = [item for item in chunks if len(item) >= 10]

    batches = get_embedding_batches(filtered_chunks)

    pinecone_service.add_vectors(namespace, batches)
