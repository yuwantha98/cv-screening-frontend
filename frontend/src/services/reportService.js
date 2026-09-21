import api from "./api";

export const getReports = () => api.get("/reports");

export const exportCSV = (params = {}) =>
  api.get("/reports/export/csv", {
    params,
    responseType: "blob",
  });

export const exportPDF = (params = {}) =>
  api.get("/reports/export/pdf", {
    params,
    responseType: "blob",
  });
