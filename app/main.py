import json

from fastapi import FastAPI, File, Form, HTTPException, UploadFile

from app.services.evaluator import (
    calculate_match_percentage,
    clean_skill_results,
    decision_maker,
)
from app.services.groq_service import (
    analyse_cv,
    generate_recommendation_text,
)
from app.services.pdf_parser import extract_pdf_text

app = FastAPI(
    title="CV Screening AI Service",
    version="1.0.0",
)

@app.get("/")
def root():
    return {
        "message": "CV Screening AI Service"
    }

@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "cv-screening-ai",
    }

@app.post("/analyze")
async def analyze_candidate(
    cv: UploadFile = File(...),
    job_json: str = Form(...),
):
    try:
        if cv.content_type != "application/pdf":
            raise HTTPException(
                status_code=400,
                detail="Only PDF CV files are allowed",
            )

        try:
            job = json.loads(job_json)
        except json.JSONDecodeError:
            raise HTTPException(
                status_code=400,
                detail="Invalid job JSON",
            )

        if not isinstance(job, dict):
            raise HTTPException(
                status_code=400,
                detail="job_json must contain a JSON object",
            )

        required_skills = job.get("requiredSkills", [])

        if not isinstance(required_skills, list):
            raise HTTPException(
                status_code=400,
                detail="requiredSkills must be an array",
            )

        file_bytes = await cv.read()

        if not file_bytes:
            raise HTTPException(
                status_code=400,
                detail="Uploaded CV is empty",
            )

        cv_text = extract_pdf_text(file_bytes)

        ai_analysis = analyse_cv(
            job,
            cv_text,
        )

        matched_skills, missing_skills = clean_skill_results(
            required_skills,
            ai_analysis.get("matched_skills", []),
        )

        scores = calculate_match_percentage(
            required_skills,
            matched_skills,
            ai_analysis.get("experience_score", 0),
        )

        minimum_match_score = job.get("minimumMatchScore")

        if minimum_match_score is None:
            minimum_match_score = (
                job.get("aiScreening", {})
                .get("minimumMatchScore", 70)
            )

        recommendation = decision_maker(
            scores["match_percentage"],
            minimum_match_score,
        )

        explanation = generate_recommendation_text(
            job,
            scores["match_percentage"],
            recommendation,
            matched_skills,
            missing_skills,
            ai_analysis.get("evidence", []),
        )

        return {
            "candidateName": ai_analysis.get("candidate_name", ""),
            "candidateEmail": ai_analysis.get("candidate_email", ""),
            "matchPercentage": scores["match_percentage"],
            "matchedSkills": matched_skills,
            "missingSkills": missing_skills,
            "recommendation": recommendation,
            "recommendationSummary": explanation.get(
                "recommendation_summary",
                "",
            ),
            "recommendationJustification": explanation.get(
                "recommendation_justification",
                "",
            ),
            "justificationPoints": explanation.get(
                "justification_points",
                [],
            ),
            "scoreBreakdown": {
                "technicalFit": scores["skill_score"],
                "experienceMatch": scores["experience_score"],
            },
        }

    except HTTPException:
        raise
    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error),
        )
    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error),
        )
