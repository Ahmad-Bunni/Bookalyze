import pinecone


class PineconeService:
    _instance = None

    def __init__(self, api_key, env, index_name):
        self._api_key = api_key
        self._env = env
        self._index_name = index_name
        self._index = None

    @property
    def index(self):
        if self._index is None:
            print("Loading pinecone index...")
            self._index = self.load_pinecone_index(
                self._api_key, self._env, self._index_name)
        return self._index

    def load_pinecone_index(self, api_key, env, index_name):
        pinecone.init(api_key=api_key, environment=env)
        if not index_name in pinecone.list_indexes():
            raise KeyError(f"Index '{index_name}' does not exist.")
        return pinecone.Index(index_name)

    @classmethod
    def get_instance(cls, api_key=None, env=None, index_name=None):
        if cls._instance is None:
            print('Initializing PineconeService instance...')
            cls._instance = cls(api_key, env, index_name)
        return cls._instance

    def add_vectors(self, namespace, batches):
        for batch in batches:
            self.index.upsert(vectors=batch, namespace=namespace)

    def query(self, namespace, embeddings):
        try:
            query_response = self.index.query(
                namespace=namespace,
                top_k=10,
                include_values=False,
                include_metadata=True,
                vector=embeddings,
            )

            context = ""
            for result in query_response.matches:
                if result.score > 0.6:
                    currentContext = str(result.metadata["content"])
                    context += f'{currentContext} '

            return context.strip()

        except Exception as e:
            print(f"Error querying Pinecone: {e}")
            return None
