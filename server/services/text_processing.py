import spacy
import re


class TextProcessing:
    _instance = None

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    def __init__(self):
        if TextProcessing._instance is not None:
            raise Exception("This class is a singleton!")
        TextProcessing._instance = self
        self._nlp = None

    @property
    def nlp(self):
        if self._nlp is None:
            print("Loading SpaCy model...")
            self._nlp = spacy.load("en_core_web_md")
        return self._nlp

    def chunk(self, text, token_length=256, overlap=20):
        doc = self.nlp(text)
        chunks = []
        current_chunk = []
        current_length = 0

        for sentence in doc.sents:
            sentence_length = len(sentence)

            # If adding this sentence doesn't exceed the token length,
            # add it to the current chunk.
            if current_length + sentence_length <= token_length:
                current_chunk.append(sentence.text)
                current_length += sentence_length
            else:
                # Otherwise, store the current chunk and start a new one
                chunks.append(' '.join(current_chunk))
                current_chunk = [sentence.text]
                current_length = sentence_length

        # Store the last chunk if any
        if current_chunk:
            chunks.append(' '.join(current_chunk))

        # Now create overlapping chunks
        overlap_chunks = []
        for i in range(0, len(chunks)-1):  # Adjusted to not exceed the list length
            # Taking two chunks at a time for overlap
            overlap_text = ' '.join(chunks[i:i+2])
            tokens = [token.text for token in self.nlp(overlap_text)]

            # Create a chunk that includes the overlap from the next chunk
            new_chunk = tokens[:token_length + overlap]  # Using list slicing

            overlap_chunks.append(' '.join(new_chunk))

        # Combine original and overlapping chunks
        final_chunks = chunks + overlap_chunks

        return final_chunks

    def clean_text(self, text: str) -> str:
        cleaned = re.sub(r'https?://\S+|www\.\S+', '', text)
        cleaned = re.sub(r'\S+@\S+', '', text)
        cleaned = ''.join(
            ch for ch in text if ch.isprintable() or ch.isspace())
        cleaned = ' '.join(cleaned.split())
        cleaned = re.sub(r'\n{3,}', '\n[SECTION]\n', cleaned)
        return cleaned

    def classify_question(self, text: str) -> str:
        doc = self.nlp(text)
        # Check for WH-words
        wh_words = {"who", "what", "where", "when",
                    "why", "how", "which", "whom", "whose"}
        if doc[0].text.lower() not in wh_words:
            return "generic"
        # Check for named entities
        if doc.ents:
            return "specific"
        # Check for pronouns or proper nouns after WH-word
        if doc[1].pos_ in ["PRP", "PROPN"]:
            return "specific"
        return "generic"
