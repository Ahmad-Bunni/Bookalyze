from services.pinecone_hybrid_search import PineconeHybridSearch
from langchain.chains import RetrievalQA
from langchain.callbacks import get_openai_callback


class QuestionHandler:
    def __init__(self, chunk_extractor_service, llm):
        self.llm = llm
        self.chunk_extractor_service = chunk_extractor_service
        self.pinecone_service = PineconeHybridSearch(
            index_name="default")

    def answer_question(self, question, namespace):
        reply = ''
        with get_openai_callback() as cb:
            qa = RetrievalQA.from_chain_type(
                llm=self.llm,
                chain_type="stuff",
                retriever=self.pinecone_service.get_compression_retriever)
            reply = qa.run(question)
        print(cb)
        return reply
