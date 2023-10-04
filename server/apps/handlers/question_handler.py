import asyncio
from typing import AsyncIterable, List, Tuple

from langchain.chat_models import ChatOpenAI
from langchain.chains import ConversationalRetrievalChain
from langchain.llms.fake import FakeListLLM
from langchain.callbacks import AsyncIteratorCallbackHandler
from services.pinecone_hybrid_search import PineconeHybridSearch
from ..prompts import PROMPT


class QuestionHandler:
    def __init__(self, chunk_extractor_service, namespace, encoder, embeddings, index):
        self.chunk_extractor_service = chunk_extractor_service
        self.pinecone_service = PineconeHybridSearch(
            namespace, embeddings, index, encoder)

    async def answer_question(self, messages: List[dict]) -> AsyncIterable[str]:
        callback = AsyncIteratorCallbackHandler()
        llm = ChatOpenAI(streaming=True, callbacks=[callback])
        question, chat_history = self._process_messages(messages)

        qa_chain = self._create_qa_chain(llm, question)

        task = asyncio.create_task(self._run_chain(
            qa_chain, question, chat_history, callback.done))

        async for token in callback.aiter():
            yield token

        await task

    def _process_messages(self, messages: List[dict]) -> Tuple[str, List[Tuple[str, str]]]:
        question = messages.pop()['content']
        chat_history = [(messages[i]['content'], messages[i + 1]['content'])
                        for i in range(0, len(messages) - 1, 2)]
        return question, chat_history

    def _create_qa_chain(self, llm, question):
        return ConversationalRetrievalChain.from_llm(
            llm=llm,
            chain_type="stuff",
            combine_docs_chain_kwargs={'prompt': PROMPT},
            retriever=self.pinecone_service.retriever,
            condense_question_llm=FakeListLLM(responses=[question])
        )

    async def _run_chain(self, qa_chain: ConversationalRetrievalChain, question: str, chat_history, done_event):
        try:
            await qa_chain.arun({"question": question, "chat_history": chat_history})
        except Exception as e:
            print(f"Caught exception: {e}")
        finally:
            done_event.set()
