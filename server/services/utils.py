import re


def clean_text(text):
    cleaned = ''.join(ch for ch in text if ch.isprintable() or ch.isspace())

    cleaned = ' '.join(cleaned.split())

    cleaned = re.sub(r'\n{3,}', '\n[SECTION_DELIMITER]\n', cleaned)

    return cleaned


def chunk_text(cleaned_text: str, max_chunk_size: int = 512) -> list:
    sentence_endings = re.compile(r'(?<=[.!?])\s')
    sentences = [s.strip() for s in sentence_endings.split(cleaned_text) if s]

    chunks, current_chunk, current_length = [], [], 0

    for sentence in sentences:
        if current_length + len(sentence) <= max_chunk_size:
            current_chunk.append(sentence)
            current_length += len(sentence) + 1
        else:
            chunks.append(' '.join(current_chunk))
            current_chunk = [sentence]
            current_length = len(sentence) + 1

    if current_chunk:
        chunks.append(' '.join(current_chunk))

    return chunks


def get_batches(text_array, model):
    vectors = []
    for chunk_id, text_chunk in enumerate(text_array):
        embeddings = [model.encode(text_chunk)]
        vectors.append(
            (str(chunk_id), embeddings[0].tolist(), {"content": text_chunk}))

    batch_size = 10
    return [vectors[i:i+batch_size]
            for i in range(0, len(vectors), batch_size)]
