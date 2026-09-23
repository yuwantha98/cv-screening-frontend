import re


class CandidateInformationExtractor:
    """Extracts useful baseline fields without sending CV data to an LLM."""

    email_pattern = re.compile(r"[\w.+-]+@[\w-]+(?:\.[\w-]+)+")
    phone_pattern = re.compile(r"(?:\+?\d[\d\s().-]{7,}\d)")
    skill_pattern = re.compile(
        r"\b(?:python|java|javascript|typescript|react|node\.js|sql|aws|azure|docker|kubernetes|"
        r"figma|product design|user research|data analysis|project management|machine learning)\b",
        re.IGNORECASE,
    )

    def extract(self, text: str) -> dict:
        normalized = " ".join(text.split())
        emails = sorted(set(self.email_pattern.findall(normalized)))
        phones = sorted(set(match.group(0).strip() for match in self.phone_pattern.finditer(normalized)))
        skills = sorted({match.group(0).lower() for match in self.skill_pattern.finditer(normalized)})
        lines = [line.strip() for line in text.splitlines() if line.strip()]
        name = lines[0] if lines and not self.email_pattern.search(lines[0]) else None
        return {
            "name": name,
            "email": emails[0] if emails else None,
            "phone": phones[0] if phones else None,
            "skills": skills,
            "summary": normalized[:500],
        }