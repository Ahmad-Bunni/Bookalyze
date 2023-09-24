import threading
from services.pinecone_hybrid_search import PineconeHybridSearch
from langchain.chat_models import ChatOpenAI
from langchain.chains import ConversationalRetrievalChain
from langchain.chains import ConversationalRetrievalChain
from langchain.llms.fake import FakeListLLM
from ..services.stream import ChainStreamHandler, ThreadedGenerator
from ..services.history_extractor import HistoryExtractor
from ..services.prompts import PROMPT


class QuestionHandler:
    def __init__(self, chunk_extractor_service):
        self.chunk_extractor_service = chunk_extractor_service
        self.pinecone_service = PineconeHybridSearch(
            index_name="default")

    def answer_question(self, messages):
        chat_history, question = HistoryExtractor.process_messages(
            messages)
        g = ThreadedGenerator()
        threading.Thread(target=self.llm_thread, args=(
            g, chat_history, question)).start()
        return g

    def llm_thread(self, g, chat_history, question):
        try:

            llm = ChatOpenAI(streaming=True, callbacks=[ChainStreamHandler(g)])
            qa = ConversationalRetrievalChain.from_llm(
                llm,
                condense_question_llm=FakeListLLM(responses=[question]),
                retriever=self.pinecone_service.get_compression_retriever,
                combine_docs_chain_kwargs={'prompt': PROMPT})

            qa({"question": question, "chat_history": chat_history})
        finally:
            g.close()
