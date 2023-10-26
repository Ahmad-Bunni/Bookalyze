from .async_pinecone_hybrid_search import AsyncPineconeHybridSearchRetriever


class PineconeHybridSearch:
    def __init__(self, namespace, embeddings, index, encoder):
        self.embeddings = embeddings
        self.index = index
        self.namespace = namespace
        self.encoder = encoder
        self.retriever = AsyncPineconeHybridSearchRetriever(
            embeddings=self.embeddings,
            index=self.index,
            sparse_encoder=self.encoder,
            namespace=namespace,
            alpha=0.30,
            top_k=10)

    def add_documents(self, docs):
        self.retriever.add_texts(docs, namespace=self.namespace)
