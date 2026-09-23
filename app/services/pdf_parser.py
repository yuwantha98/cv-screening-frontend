import io
import pdfplumber

def extract_pdf_text(file_bytes: bytes) -> str:
    text_parts = []

    with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
        for page in pdf.pages:
            text_parts.append(page.extract_text() or "")

    final_text = "\n".join(text_parts).strip()

    if not final_text:
        raise ValueError("No readable text found in CV")

    return final_text
