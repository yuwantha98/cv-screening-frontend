export function notFound(request, response) {
  response.status(404).json({
    message: `Route not found: ${request.method} ${request.originalUrl}`,
  });
}

export function errorHandler(error, _request, response, _next) {
  console.error(error);

  const statusCode = error.code === "LIMIT_FILE_SIZE"
    ? 400
    : error.name === "CastError"
      ? 400
      : error.code === 11000
        ? 409
        : error.statusCode || 500;
  const message = error.code === "LIMIT_FILE_SIZE"
    ? "A CV file exceeds the 10 MB size limit"
    : error.name === "CastError"
      ? "Invalid resource identifier"
      : error.code === 11000
        ? "A user with that email already exists"
    : statusCode === 500
      ? "Internal server error"
      : error.message;

  response.status(statusCode).json({
    message,
  });
}
