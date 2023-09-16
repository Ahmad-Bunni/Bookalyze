import fitz


def extract_pdf_pages(stream):
    with fitz.open(stream=stream) as pdf_document:
        for page in pdf_document:
            page_text = page.get_text().strip()

            if not page_text:
                continue

            yield page_text
