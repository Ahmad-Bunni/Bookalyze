from langchain.retrievers import PineconeHybridSearchRetriever


class PineconeHybridSearch:
    def __init__(self, namespace, embeddings, index, encoder):
        self.embeddings = embeddings
        self.index = index
        self.namespace = namespace
        self.encoder = encoder
        self.retriever = PineconeHybridSearchRetriever(
            embeddings=self.embeddings,
            index=self.index,
            sparse_encoder=self.encoder,
            namespace=self.namespace,
            alpha=0.25,
            top_k=3)

    def add_documents(self, docs):
        self.retriever.add_texts(docs, namespace=self.namespace)
