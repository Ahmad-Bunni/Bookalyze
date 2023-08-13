from sentence_transformers import SentenceTransformer


def embedding_model():
    return SentenceTransformer("average_word_embeddings_glove.6B.300d")
