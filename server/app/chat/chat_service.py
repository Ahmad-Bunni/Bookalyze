from typing import AsyncIterable, List

from langchain_community.chat_models import ChatOllama
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough

from app.core.pinecone_service import PineconeService

# from app.core.pinecone_service import PineconeService


class ChatService:
    def __init__(self, namespace, embeddings, index):
        self.pinecone_service = PineconeService(namespace, embeddings, index)

    async def answer_question(self, messages: List[dict]) -> AsyncIterable[str]:
        # model = ChatOpenAI(
        #     model_name="mistralai/Mistral-7B-Instruct-v0.2",
        #     openai_api_key="",
        #     openai_api_base="https://api.together.xyz/v1",
        #     temperature=0.1,
        #     max_tokens=512,
        # )

        formatted_messages = [
            (message["role"], message["content"]) for message in messages
        ]

        qa_system_prompt = """You are an assistant for question-answering tasks. \
        Use the following pieces of retrieved context to answer the question. \
        If you don't know the answer, just say that you don't know. \
        Use three sentences maximum and keep the answer concise.\

        {context}"""
        # formatted_messages.insert(
        #     0,
        #     (
        #         "system",
        #         qa_system_prompt,
        #     ),
        # )

        def format_docs(docs):
            return "\n\n".join([d.page_content for d in docs])

        prompt = ChatPromptTemplate.from_messages(formatted_messages)

        model = ChatOllama(
            model="llama2",
            temperature=0.1,
            stop=["[INST]", "[/INST]", "<<SYS>>", "<</SYS>>"],
        )

        output_parser = StrOutputParser()

        chain = (
            {
                "context": self.pinecone_service.retriever | format_docs,
                "question": RunnablePassthrough(),
            }
            | prompt
            | model
            | output_parser
        )

        question = messages.pop()["content"]

        async for chunk in chain.astream(question):
            yield chunk
