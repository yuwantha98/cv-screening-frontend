import json
import os
import re

from dotenv import load_dotenv
from groq import Groq

load_dotenv()

def _get_client():
    api_key = os.getenv("GROQ_API_KEY")

    if not api_key:
        raise RuntimeError("GROQ_API_KEY is not configured in .env")

    return Groq(api_key=api_key)

def _get_model():
    model = os.getenv("GROQ_MODEL")

    if not model:
        raise RuntimeError("GROQ_MODEL is not configured in .env")

    return model

def _parse_json(content: str) -> dict:
    if not content:
        raise ValueError("Groq returned an empty response")

    cleaned = content.strip()

    if cleaned.startswith("```"):
        cleaned = re.sub(r"^```(?:json)?\s*", "", cleaned, flags=re.IGNORECASE)
        cleaned = re.sub(r"\s*```$", "", cleaned)

    try:
        return json.loads(cleaned)
    except json.JSONDecodeError as error:
        raise ValueError(f"Groq returned invalid JSON: {error}") from error

def analyse_cv(job: dict, cv_text: str) -> dict:
    required_skills = job.get("requiredSkills", [])

    prompt = f"""
You are a precise CV screening analysis assistant.

Evaluate the CV ONLY against the supplied job.
Use only evidence that exists in the CV.
Do not invent skills, experience, education, or achievements.

JOB TITLE:
{job.get("title", "")}

JOB DESCRIPTION:
{job.get("description", "")}

REQUIRED SKILLS:
{json.dumps(required_skills)}

CV TEXT:
{cv_text[:30000]}

Return ONLY valid JSON in exactly this structure:

{{
  "candidate_name": "",
  "candidate_email": "",
  "matched_skills": [],
  "experience_score": 0,
  "evidence": []
}}

Rules:
1. matched_skills may contain ONLY exact names from REQUIRED SKILLS.
2. Include a skill only when the CV gives reasonable evidence for it.
3. experience_score must be an integer from 0 to 100 measuring relevance to this job.
4. evidence must be short factual reasons supported by the CV.
5. If name or email cannot be found, return an empty string.
6. Do not include markdown or any text outside the JSON object.
"""

    response = _get_client().chat.completions.create(
        model=_get_model(),
        temperature=0.1,
        messages=[
            {
                "role": "system",
                "content": "You are a careful CV screening assistant. Return valid JSON only.",
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
        response_format={"type": "json_object"},
    )

    result = _parse_json(response.choices[0].message.content)
    result.setdefault("candidate_name", "")
    result.setdefault("candidate_email", "")
    result.setdefault("matched_skills", [])
    result.setdefault("experience_score", 0)
    result.setdefault("evidence", [])

    return result

def generate_recommendation_text(
    job: dict,
    match_percentage,
    recommendation: str,
    matched_skills,
    missing_skills,
    evidence,
) -> dict:
    prompt = f"""
Create a concise HR-facing explanation for this candidate evaluation.

JOB TITLE:
{job.get("title", "")}

JOB DESCRIPTION:
{job.get("description", "")}

MATCH SCORE:
{match_percentage}%

FINAL DECISION:
{recommendation}

MATCHED SKILLS:
{json.dumps(matched_skills)}

MISSING SKILLS:
{json.dumps(missing_skills)}

CV EVIDENCE:
{json.dumps(evidence)}

Return ONLY valid JSON in exactly this structure:

{{
  "recommendation_summary": "",
  "recommendation_justification": "",
  "justification_points": []
}}

Rules:
1. Do not change FINAL DECISION.
2. Do not invent information.
3. Explain strengths using supplied evidence.
4. Explain relevant gaps using missing skills.
5. recommendation_summary should be short.
6. recommendation_justification should clearly explain the result.
7. justification_points should be short evidence-based bullet points.
8. Do not include markdown or text outside the JSON object.
"""

    response = _get_client().chat.completions.create(
        model=_get_model(),
        temperature=0.2,
        messages=[
            {
                "role": "system",
                "content": (
                    "Write professional, concise and evidence-based candidate "
                    "screening explanations. Return JSON only."
                ),
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
        response_format={"type": "json_object"},
    )

    result = _parse_json(response.choices[0].message.content)
    result.setdefault("recommendation_summary", "")
    result.setdefault("recommendation_justification", "")
    result.setdefault("justification_points", [])

    return result
