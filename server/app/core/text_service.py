from io import BytesIO

import pdfplumber


class TextService:
    @staticmethod
    def extract_text_from_pdf_bytes(stream):
        text_chunks = []
        with pdfplumber.open(BytesIO(stream)) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text(layout=False)
                if page_text:
                    text_chunks.append(page_text)

        return text_chunks

    @staticmethod
    def is_pdf(filename: str):
        return filename.lower().endswith(".pdf")
