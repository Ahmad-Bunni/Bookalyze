from typing import AsyncIterable, List

from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_openai import ChatOpenAI

# from app.core.pinecone_service import PineconeService


class ChatService:
    # def __init__(self, namespace, embeddings, index):
    #     self.pinecone_service = PineconeService(namespace, embeddings, index)

    async def answer_question(self, messages: List[dict]) -> AsyncIterable[str]:
        model = ChatOpenAI(
            model_name="Open-Orca/Mistral-7B-OpenOrca",
            openai_api_key="",
            openai_api_base="https://api.together.xyz/v1",
            temperature=0.1,
            max_tokens=512,
        )

        prompt = PromptTemplate.from_template(
            """
            You are a sharp assistant. Answer the question in the same languaged asked and based on the given context.
            \n
            Context: Example 1: Pet Survey (GR 2–3)
            Ms. Hubert’s afterschool students took a survey of the 600 students at Morales Elementary 
            School. Students were asked to select their favorite pet from a list of eight animals. Here 
            are the results. 
            Lizard 25, Dog 250, Cat 115, Bird 50, Guinea pig 30, Hamster 45, Fish 75, 
            Ferret 10.
            \n
            Question:{question}.
            \n
            Answer:
            """
        )

        output_parser = StrOutputParser()

        chain = {"question": RunnablePassthrough()} | prompt | model | output_parser

        question = messages.pop()["content"]

        async for chunk in chain.astream(question):
            yield chunk
