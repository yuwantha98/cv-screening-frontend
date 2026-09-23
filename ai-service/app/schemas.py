from pydantic import BaseModel, Field


class ExtractionRequest(BaseModel):
    text: str = Field(min_length=1)


class MatchRequest(BaseModel):
    job_description: str = Field(min_length=1)
    cv_text: str = Field(min_length=1)


class EvaluationRequest(MatchRequest):
    candidate_id: str | None = None