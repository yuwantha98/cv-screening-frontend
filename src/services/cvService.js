import api from "./api";

export const uploadCVs = (formData) =>
  api.post("/cv/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getProcessingStatus = () =>
  api.get("/cv/processing-status");
