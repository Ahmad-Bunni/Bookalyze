from fastapi import UploadFile
from app.core.pinecone_hybrid_search import PineconeHybridSearch
import fitz


class ContentService:
    def __init__(self, namespace, encoder, embeddings, index):

        self.pinecone_service = PineconeHybridSearch(
            namespace, embeddings, index, encoder)

    async def process_file(self, file: UploadFile):

        if not self._is_pdf(file.filename):
            raise ValueError("File is not a PDF.")

        stream = await file.read()
        text = self.extract_pdf_content(stream)
        self.process_text(text)

    def process_text(self, text):
        # chunks
        self.pinecone_service.add_documents(text)

    def _is_pdf(self, filename):
        return filename.endswith('.pdf')

    @staticmethod
    def extract_pdf_content(stream):
        with fitz.open(stream=stream) as pdf_document:
            full_text = ""

            for page in pdf_document:
                page_text = page.get_text().strip()

                if not page_text:
                    continue

                full_text += "\n " + page_text

            return full_text
