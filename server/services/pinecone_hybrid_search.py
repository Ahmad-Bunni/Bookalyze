import pinecone
from flask import current_app

from langchain.retrievers import PineconeHybridSearchRetriever, ContextualCompressionRetriever
from langchain.text_splitter import SpacyTextSplitter
from langchain.document_transformers import LongContextReorder
from langchain.retrievers.document_compressors import DocumentCompressorPipeline, EmbeddingsFilter
from pinecone_text.sparse import BM25Encoder


class PineconeHybridSearch:

    def __init__(self, index_name, chunk_size=1500, chunk_overlap=0, similarity_threshold=0.07):
        self.embeddings = current_app.embedding_model
        self.index = pinecone.Index(index_name)

        self.splitter = SpacyTextSplitter(
            chunk_size=chunk_size, chunk_overlap=chunk_overlap, pipeline="en_core_web_md")
        self.relevant_filter = EmbeddingsFilter(
            embeddings=self.embeddings, similarity_threshold=similarity_threshold)
        self.pipeline_compressor = DocumentCompressorPipeline(
            transformers=[self.splitter,
                          self.relevant_filter, LongContextReorder()]
        )

        self.bm25_encoder = self._load_bm25_encoder()
        self._setup_retriever()

    def _load_bm25_encoder(self, path=None):
        if path:
            return BM25Encoder().load(path)
        return current_app.bm25_encoder

    def _setup_retriever(self):
        self.retriever = PineconeHybridSearchRetriever(
            embeddings=self.embeddings,
            index=self.index,
            sparse_encoder=self.bm25_encoder,
            alpha=0.3,
            top_k=3
        )
        self.compression_retriever = ContextualCompressionRetriever(
            base_compressor=self.pipeline_compressor,
            base_retriever=self.retriever
        )

    @property
    def get_compression_retriever(self):
        return self.compression_retriever

    def add_documents(self, docs, path):
        self.bm25_encoder.fit(docs).dump(f"{path}.json")
        self._setup_retriever()
        self.retriever.add_texts(docs)
