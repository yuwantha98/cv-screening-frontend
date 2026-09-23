import re


class JobCvMatchingAgent:
    stop_words = {"and", "the", "with", "for", "that", "this", "from", "your", "years"}

    def analyze(self, job_description: str, cv_text: str) -> dict:
        required = self._terms(job_description)
        candidate = self._terms(cv_text)
        matching = sorted(required & candidate)
        missing = sorted(required - candidate)
        score = round((len(matching) / len(required)) * 100) if required else 0
        return {
            "match_percentage": score,
            "matching_skills": matching,
            "missing_skills": missing,
            "required_terms": sorted(required),
        }

    def _terms(self, text: str) -> set[str]:
        return {
            term
            for term in re.findall(r"[a-z][a-z0-9+#.-]{2,}", text.lower())
            if term not in self.stop_words
        }