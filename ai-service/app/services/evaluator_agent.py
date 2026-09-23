class HREvaluatorAgent:
    def evaluate(self, candidate: dict, match: dict) -> dict:
        score = match["match_percentage"]
        if score >= 80:
            recommendation = "strong_match"
        elif score >= 50:
            recommendation = "review"
        else:
            recommendation = "weak_match"
        return {
            "candidate": candidate,
            "match": match,
            "recommendation": recommendation,
            "confidence": "baseline",
            "notes": "Review this automated assessment with a qualified human before making a hiring decision.",
        }