import api from "./api";

export const getCandidateResults = () =>
  api.get("/candidates");

export const getCandidateDetails = (candidateId) =>
  api.get(`/candidates/${candidateId}`);

export const getCandidateRanking = () =>
  api.get("/candidates/ranking");

export const getCandidateEvaluation = (candidateId) =>
  api.get(`/candidates/${candidateId}/evaluation`);

export const compareCandidates = (candidateIds) =>
  api.post("/candidates/compare", { candidateIds });

export const getMatchAnalysis = (candidateId) =>
  api.get(`/candidates/${candidateId}/match-analysis`);
