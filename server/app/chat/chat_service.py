import asyncio
from typing import AsyncIterable, List, Tuple
from langchain.chat_models import ChatOpenAI
from langchain.chains import ConversationalRetrievalChain
from langchain.llms.fake import FakeListLLM
from langchain.callbacks import AsyncIteratorCallbackHandler
from app.core.pinecone_hybrid_search import PineconeHybridSearch
from app.core.cost import Cost, CostCalcCallbackHandler
from app.chat.constants import PROMPT


class ChatService:
    def __init__(self, namespace, encoder, embeddings, index):
        self.pinecone_service = PineconeHybridSearch(
            namespace, embeddings, index, encoder)

    async def answer_question(self, messages: List[dict]) -> AsyncIterable[str]:
        callback = AsyncIteratorCallbackHandler()
        cost = Cost()
        llm = ChatOpenAI(model_name='gpt-3.5-turbo', streaming=True, callbacks=[
                         callback, CostCalcCallbackHandler("gpt-3.5-turbo", cost)])
        question, chat_history = self._process_messages(messages)

        qa_chain = self._create_qa_chain(llm, question)

        task = asyncio.create_task(self._run_chain(
            qa_chain, question, chat_history, callback.done))

        async for token in callback.aiter():
            yield token

        await task

        print(cost)

    def _process_messages(self, messages: List[dict]) -> Tuple[str, List[Tuple[str, str]]]:
        question = messages.pop()['content']

        last_messages = messages[-8:]

        chat_history = [(last_messages[i]['content'], last_messages[i + 1]['content'])
                        for i in range(0, len(last_messages) - 1, 2)]

        return question, chat_history

    def _create_qa_chain(self, llm, question):

        result = ConversationalRetrievalChain.from_llm(
            llm=llm,
            chain_type="stuff",
            combine_docs_chain_kwargs={'prompt': PROMPT},
            retriever=self.pinecone_service.retriever,
            condense_question_llm=FakeListLLM(responses=[question])
        )

        return result

    async def _run_chain(self, qa_chain: ConversationalRetrievalChain, question: str, chat_history, done_event):
        try:
            await qa_chain.arun({"question": question, "chat_history": chat_history})
        except Exception as e:
            print(f"Caught exception: {e}")
        finally:
            done_event.set()