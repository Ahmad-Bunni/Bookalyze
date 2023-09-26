from typing import List
import spacy
import re


class ChunkExtractor:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super(ChunkExtractor, cls).__new__(cls)
            cls._instance.__initialized = False
        return cls._instance

    def __init__(self):
        if self.__initialized:
            return
        self.nlp = spacy.load("en_core_web_sm")
        self.__initialized = True

    @classmethod
    def get_instance(cls):
        if not cls._instance:
            cls._instance = ChunkExtractor()
        return cls._instance

    @staticmethod
    def clean_text(text):
        text = text.encode("ascii", "ignore").decode()
        return re.sub(r'\s+', ' ', text).strip()

    def chunk_text_using_spacy(self, text: str, max_tokens: int = 512, overlap: int = 10) -> List[str]:
        text = self.clean_text(text)
        doc = self.nlp(text)

        chunks = []
        current_chunk = []
        current_token_count = 0

        for sent in doc.sents:
            if len(sent) > max_tokens:
                start_token = 0
                while start_token < len(sent):
                    chunk_tokens = sent[start_token:start_token+max_tokens]
                    chunks.append(chunk_tokens.text)
                    start_token += max_tokens - overlap
                continue

            if current_token_count + len(sent) > max_tokens:
                chunks.append(" ".join(token.text for token in current_chunk))
                current_chunk = []
                current_token_count = 0

            current_chunk.extend(sent)
            current_token_count += len(sent)

        if current_chunk:
            chunks.append(" ".join(token.text for token in current_chunk))

        return chunks
