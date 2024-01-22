from langchain.vectorstores.pinecone import Pinecone


class PineconeService:
    def __init__(self, namespace, embeddings, index):
        self.embeddings = embeddings
        self.index = index
        self.namespace = namespace
        self.vectore_store = Pinecone.from_existing_index(
            index, embeddings, "text", namespace)
        self.retriever = self.vectore_store.as_retriever(
            search_type="mmr", search_kwargs={"k": 5, "top_k": 20})

    def add_texts(self, texts):
        self.vectore_store.add_texts(texts)
