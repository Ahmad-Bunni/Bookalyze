from typing import List
import asyncio
from langchain.retrievers import PineconeHybridSearchRetriever
from langchain.callbacks.manager import AsyncCallbackManagerForRetrieverRun
from langchain.schema import Document


class AsyncPineconeHybridSearchRetriever(PineconeHybridSearchRetriever):

    async def _aget_relevant_documents(self, query: str, *, run_manager: AsyncCallbackManagerForRetrieverRun) -> List[Document]:
        from pinecone_text.hybrid import hybrid_convex_scale

        # Convert the question into sparse and dense vectors
        sparse_vec = self.sparse_encoder.encode_queries(query)
        dense_vec = self.embeddings.embed_query(query)

        # Scale alpha with hybrid_scale
        dense_vec, sparse_vec = hybrid_convex_scale(
            dense_vec, sparse_vec, self.alpha)
        sparse_vec["values"] = [float(s1) for s1 in sparse_vec["values"]]

        # Directly include the async_query logic here
        loop = asyncio.get_running_loop()
        result = await loop.run_in_executor(
            None,
            lambda: self.index.query(
                vector=dense_vec,
                sparse_vector=sparse_vec,
                top_k=self.top_k,
                include_metadata=True,
                namespace=self.namespace
            )
        )

        # Process results to get relevant documents
        final_result = []
        for res in result["matches"]:
            context = res["metadata"].pop("context")
            final_result.append(
                Document(page_content=context, metadata=res["metadata"]))

        return final_result
