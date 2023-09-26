import threading
from langchain.chat_models import ChatOpenAI
from langchain.chains import ConversationalRetrievalChain
from langchain.llms.fake import FakeListLLM
from langchain.callbacks.manager import CallbackManager
from services.pinecone_hybrid_search import PineconeHybridSearch
from ..services.prompts import PROMPT
from ..services.history_extractor import HistoryExtractor
from ..services.stream import ThreadedGenerator, ChainStreamHandler


class QuestionHandler:
    def __init__(self, chunk_extractor_service, namespace, encoder, embeddings, index):
        self.chunk_extractor_service = chunk_extractor_service
        self.pinecone_service = PineconeHybridSearch(
            namespace, embeddings, index, encoder)

    def answer_question(self, messages):
        g = ThreadedGenerator()
        threading.Thread(target=self._chain, args=(g, messages)).start()
        return g

    def _chain(self, g, messages):
        chat_history, question = HistoryExtractor.process_messages(messages)

        try:
            llm = ChatOpenAI(streaming=True, callback_manager=CallbackManager(
                [ChainStreamHandler(g)]))

            qa = ConversationalRetrievalChain.from_llm(
                llm=llm,
                chain_type="stuff",
                combine_docs_chain_kwargs={'prompt': PROMPT},
                retriever=self.pinecone_service.retriever,
                condense_question_llm=FakeListLLM(
                    responses=[question]))

            qa({"question": question, "chat_history": chat_history})

        finally:
            g.close()
