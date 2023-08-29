import openai
import uuid
import concurrent.futures


BASIC_MODEL = "gpt-3.5-turbo"
PREMIUM_MODEL = "gpt-4"
EMBEDDING_MODEL = "text-embedding-ada-002"


messages = [
    {
        "role": "system",
                "content": "You are a sharp and helpful assistant that answers user questions."
    }
]


def handle_message(question, context):

    messages.append({
        "role": "user",
                "content": f"{question}"
    })

    if (context):
        messages.append({
            "role": "system",
            "content": f"Rely on the following context to answer the question '{context}'"
        })

    response = openai.ChatCompletion.create(
        model=BASIC_MODEL,
        temperature=0.1,
        max_tokens=512,
        messages=messages,
    )

    model_response = response['choices'][0]['message']['content']

    return model_response


def get_embedding(text):
    return openai.Engine(id=EMBEDDING_MODEL).embeddings(input=[text])["data"][0]["embedding"]


def get_embedding_with_id(text):
    return str(uuid.uuid4()), get_embedding(text), {"content": text}


def get_embedding_batches(text_array, batch_size=100):
    with concurrent.futures.ThreadPoolExecutor(max_workers=50) as executor:
        vectors = list(executor.map(get_embedding_with_id, text_array))

    return [vectors[i:i+batch_size]
            for i in range(0, len(vectors), batch_size)]
