export function getHealth(_request, response) {
  response.status(200).json({
    status: "ok",
    service: "cv-screening-api",
    timestamp: new Date().toISOString(),
  });
}
