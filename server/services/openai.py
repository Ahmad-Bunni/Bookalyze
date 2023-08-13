import openai
import logging
import time

BASIC_MODEL = "gpt-3.5-turbo"
PREMIUM_MODEL = "gpt-4"
EMBEDDING_MODEL = "text-embedding-ada-002"


def ask_question(question, context):
    response = openai.ChatCompletion.create(
        model=BASIC_MODEL,
        temperature=0.1,
        messages=[
            {
                "role": "system",
                "content": "Given the information below as a context try to understand the context then rely on it to provide answers.\".\n\n"
                f"Context:  {context}\".\n\n"
                f"Question: {question}\".\n\n"
                f"Answer:"
            }
        ]
    )

    model_response = response['choices'][0]['message']['content'].strip()

    return model_response


def get_embedding(text, engine):
    return openai.Engine(id=engine).embeddings(input=[text])["data"][0]["embedding"]


def get_embeddings(text_array, engine):
    max_retries = 5  # Maximum number of retries
    base_delay = 1  # Base delay in seconds
    factor = 2  # Factor to multiply the delay by after each retry
    while True:
        try:
            return openai.Engine(id=engine).embeddings(input=text_array)["data"]
        except Exception as e:
            if max_retries > 0:
                logging.warning(
                    f"Request failed. Retrying in {base_delay} seconds.")
                time.sleep(base_delay)
                max_retries -= 1
                base_delay *= factor
            else:
                raise e
