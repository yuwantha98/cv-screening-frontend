# TalentScreen AI Service

Small FastAPI service for the CV screening workflow. It keeps PDF extraction,
candidate extraction, matching, and HR evaluation behind a separate service so
the existing Express API remains responsible for uploads and product data.

## Run locally

```powershell
cd ai-service
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## Endpoints

- `GET /health`
- `POST /api/v1/cv/extract-text` with multipart field `file`
- `POST /api/v1/candidates/extract` with `{ "text": "..." }`
- `POST /api/v1/matching/analyze` with `job_description` and `cv_text`
- `POST /api/v1/evaluations/assess` with `job_description` and `cv_text`

The extraction and matching agents are deterministic baselines. An LLM provider
can be added behind these service interfaces later without changing the API.