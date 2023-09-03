from typing import List
import fitz
import spacy


class TextProcessing:
    _nlp = None
    _instance = None

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            print('Initializing Spacy instance...')
            cls._nlp = spacy.load("en_core_web_md")
        return cls._instance

    @property
    def nlp(self):
        if self._nlp is None:
            print("Loading Spacy...")
            self._nlp = spacy.load("en_core_web_md")
        return self.nlp

    def _remove_stop_words(self, text: str) -> str:
        doc = self._nlp(text)
        text_parts = [token.text for token in doc if not token.is_stop]
        return "".join(text_parts)

    def _split_sentences(self, text: str) -> List[str]:
        doc = self._nlp(text)
        sentences = [sent.text for sent in doc.sents]
        return sentences

    def _group_sentences_semantically(self, sentences: List[str], threshold: int) -> List[str]:
        docs = [self._nlp(sentence) for sentence in sentences]
        segments = []

        start_idx = 0
        end_idx = 1
        segment = [sentences[start_idx]]
        while end_idx < len(docs):
            if docs[start_idx].similarity(docs[end_idx]) >= threshold:
                segment.append(sentences[end_idx])
            else:
                segments.append(" ".join(segment))
                start_idx = end_idx
                segment = [sentences[start_idx]]
            end_idx += 1

        if segment:
            segments.append(" ".join(segment))

        return segments

    def _split_text(self, text: str) -> List[str]:
        text_no_stop_words = self._remove_stop_words(text)
        sentences = self._split_sentences(text_no_stop_words)
        return self._group_sentences_semantically(sentences, 0.8)

    def get_chunks_file(self, stream):
        with fitz.open(stream=stream) as pdf:
            chunks = []
            for page in pdf:
                text = page.get_text()
                text_chunks = self.get_chunks_text(text)
                if (len(text_chunks)):
                    chunks.extend(text_chunks)

            return chunks

    def get_chunks_text(self, text):
        if (text.strip() != ''):
            return self._split_text(text)
