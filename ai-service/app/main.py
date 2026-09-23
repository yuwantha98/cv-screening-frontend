from fastapi import FastAPI, File, HTTPException, UploadFile

from .schemas import EvaluationRequest, ExtractionRequest, MatchRequest
from .services.cv_agent import CandidateInformationExtractor
from .services.evaluator_agent import HREvaluatorAgent
from .services.matching_agent import JobCvMatchingAgent
from .services.pdf_extractor import PdfTextExtractor

app = FastAPI(title="TalentScreen AI Service", version="1.0.0")
pdf_extractor = PdfTextExtractor()
candidate_extractor = CandidateInformationExtractor()
matching_agent = JobCvMatchingAgent()
evaluator_agent = HREvaluatorAgent()


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "talentscreen-ai"}


@app.post("/api/v1/cv/extract-text")
async def extract_cv_text(file: UploadFile = File(...)) -> dict:
    _ensure_pdf(file)
    content = await file.read()
    try:
        text, pages = pdf_extractor.extract(content)
    except ValueError as error:
        raise HTTPException(status_code=422, detail=str(error)) from error
    return {"file_name": file.filename, "page_count": pages, "text": text}


@app.post("/api/v1/candidates/extract")
def extract_candidate(request: ExtractionRequest) -> dict:
    return candidate_extractor.extract(request.text)


@app.post("/api/v1/matching/analyze")
def analyze_match(request: MatchRequest) -> dict:
    return matching_agent.analyze(request.job_description, request.cv_text)


@app.post("/api/v1/evaluations/assess")
def evaluate_candidate(request: EvaluationRequest) -> dict:
    match = matching_agent.analyze(request.job_description, request.cv_text)
    candidate = candidate_extractor.extract(request.cv_text)
    return evaluator_agent.evaluate(candidate, match)


def _ensure_pdf(file: UploadFile) -> None:
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=415, detail="Only PDF files are supported")