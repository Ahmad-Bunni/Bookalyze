from operator import itemgetter
from typing import AsyncIterable, List

from app.core.pinecone_service import PineconeService
from langchain.memory import ChatMessageHistory, ConversationBufferMemory
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_community.chat_models import ChatOllama
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnableLambda, RunnablePassthrough


class ChatService:
    def __init__(self, namespace, embeddings, index):
        self.pinecone_service = PineconeService(namespace, embeddings, index)

    async def answer_question(self, messages: List[dict]) -> AsyncIterable[str]:
        input = messages.pop()["content"]

        chat_history = ChatMessageHistory()

        for m in messages:
            if m["role"] == "user":
                chat_history.add_user_message(m["content"])
            else:
                chat_history.add_ai_message(m["content"])

        prompt = ChatPromptTemplate.from_messages(
            [
                ("system", "You are a helpful chatbot"),
                MessagesPlaceholder(variable_name="history"),
                ("human", "{input}"),
            ]
        )

        memory = ConversationBufferMemory(
            return_messages=True, chat_memory=chat_history
        )

        model = ChatOllama(
            model="deepseek-coder:6.7b",
        )

        chain = (
            RunnablePassthrough.assign(
                history=RunnableLambda(memory.load_memory_variables)
                | itemgetter("history")
            )
            | prompt
            | model
            | StrOutputParser()
        )

        async for chunk in chain.astream({"input": input}):
            yield chunk
