import pinecone


class PineconeService:
    _instance = None

    @staticmethod
    def get_instance():
        if PineconeService._instance is None:
            PineconeService()
        return PineconeService._instance

    def __init__(self, index):
        if PineconeService._instance is not None:
            raise Exception("This class is a singleton!")
        else:
            PineconeService._instance = self
            self._index = index

    def add_vectors(self, namespace, batch):
        self._index.upsert(vectors=batch, namespace=namespace)

    def query(self, search_term, namespace, model):
        try:
            query_vectors = [model.encode(search_term)]
            embeddings = query_vectors[0].tolist()

            query_response = self._index.query(
                namespace=namespace,
                top_k=5,
                include_values=False,
                include_metadata=True,
                vector=embeddings,
            )

            context = ""
            for result in query_response.matches:
                score = result.score
                currentContext = str(result.metadata["content"])
                context += f'{currentContext}. '

            return context

        except Exception as e:
            print(f"Error querying Pinecone: {e}")
            return None
