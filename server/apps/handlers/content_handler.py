from services.pinecone_hybrid_search import PineconeHybridSearch
from io import BytesIO
from services import file_loader


class ContentHandler:
    def __init__(self, chunk_extractor_service, namespace, encoder, embeddings, index):
        self.chunk_extractor_service = chunk_extractor_service
        self.pinecone_service = PineconeHybridSearch(
            namespace, embeddings, index, encoder)

    def process_file(self, file):
        if not self._is_pdf(file.filename):
            raise ValueError("File is not a PDF.")

        stream = BytesIO(file.read())
        for text in file_loader.extract_pdf_pages(stream):
            self.process_text(text)

    def process_text(self, text):
        chunks = self.chunk_extractor_service.chunk_text_using_spacy(text)
        self.pinecone_service.add_documents(chunks)

    def _is_pdf(self, filename):
        return filename.endswith('.pdf')
