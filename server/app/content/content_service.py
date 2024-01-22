from fastapi import UploadFile

from app.core.pinecone_service import PineconeService
from app.core.text_service import TextService


class ContentService:
    def __init__(self, namespace, embeddings, index):
        self.pinecone_service = PineconeService(namespace, embeddings, index)

    async def process_file(self, file: UploadFile):
        if not TextService.is_pdf(file.filename):
            raise ValueError("File is not a PDF")

        stream = await file.read()

        texts = TextService.extract_text_from_pdf_bytes(stream)
        self.process_text(texts)

    def process_text(self, texts):
        self.pinecone_service.add_texts(texts)
