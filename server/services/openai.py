import openai
import uuid
import concurrent.futures


BASIC_MODEL = "gpt-3.5-turbo"
PREMIUM_MODEL = "gpt-4"
EMBEDDING_MODEL = "text-embedding-ada-002"


def handle_message(question, context):
    try:
        messages = [
            {
                "role": "system",
                "content": "You are a sharp and helpful assistant that answers user questions briefly. When possible present tables, bullet points or lists nicely."
            }
        ]
        if context:
            messages.append({
                "role": "system",
                "content": f"Rely on the following context to answer the question '{context}'"
            })

        messages.append({
            "role": "user",
            "content": f"{question}"
        })

        response = openai.ChatCompletion.create(
            model=PREMIUM_MODEL,
            temperature=0.1,
            messages=messages,
        )

        model_response = response['choices'][0]['message']['content']

        return model_response

    except Exception as e:
        print("An error occurred:", e)


def get_embedding(text):
    try:
        return openai.Engine(id=EMBEDDING_MODEL).embeddings(input=[text])["data"][0]["embedding"]
    except Exception as e:
        print("An error occurred:", e)


def get_embedding_with_id(text):
    try:
        return str(uuid.uuid4()), get_embedding(text), {"content": text}
    except Exception as e:
        print("An error occurred:", e)


def get_embedding_batches(text_array, batch_size=100):
    try:
        with concurrent.futures.ThreadPoolExecutor(max_workers=50) as executor:
            vectors = list(executor.map(get_embedding_with_id, text_array))

        return [vectors[i:i+batch_size] for i in range(0, len(vectors), batch_size)]

    except Exception as e:
        print("An error occurred:", e)
