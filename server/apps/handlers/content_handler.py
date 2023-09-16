from services.pinecone_hybrid_search import PineconeHybridSearch
from io import BytesIO
from services import file_loader


class ContentHandler:
    def __init__(self, chunk_extractor_service):
        self.chunk_extractor_service = chunk_extractor_service
        self.pinecone_service = PineconeHybridSearch(
            index_name="langchain-pinecone-hybrid-search")

    def process_file(self, file, namespace):
        # Check if file is a PDF
        if not self._is_pdf(file.filename):
            raise ValueError("File is not a PDF.")

        stream = BytesIO(file.read())
        for text in file_loader.extract_pdf_pages(stream):
            self.process_text(text, namespace)

    def process_text(self, text, namespace):
        chunks = self.chunk_extractor_service.chunk_text_using_spacy(text)
        self.pinecone_service.add_documents(chunks, namespace)

    def _is_pdf(self, filename):
        return filename.endswith('.pdf')
