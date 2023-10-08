from langchain.prompts import PromptTemplate

prompt_template_doc = """
[Context]
{context}

Note: If you can't derive an answer from the provided context, kindly state that you don't know. Please refrain from conjecturing. The chat history might also provide some insights.
[Chat History]
{chat_history}

Question: {question}
Answer:
"""

PROMPT = PromptTemplate(
    template=prompt_template_doc,
    input_variables=["context", "question", "chat_history"]
)
