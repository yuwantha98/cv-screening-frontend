from io import BytesIO

from pypdf import PdfReader


class PdfTextExtractor:
    def extract(self, content: bytes) -> tuple[str, int]:
        if not content.startswith(b"%PDF"):
            raise ValueError("The uploaded file is not a valid PDF")

        try:
            reader = PdfReader(BytesIO(content))
            pages = [page.extract_text() or "" for page in reader.pages]
        except Exception as error:
            raise ValueError("The PDF could not be read") from error

        text = "\n\n".join(page.strip() for page in pages).strip()
        if not text:
            raise ValueError("No extractable text was found in the PDF")
        return text, len(pages)