const roles = new Set(["admin", "recruiter", "reviewer"]);
const statuses = new Set(["active", "suspended", "pending"]);

export function validateUserFilters(request, _response, next) {
  const { role, status, search, page = "1", limit = "20" } = request.query;
  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  if (role && !roles.has(role)) {
    return validationError(next, "role must be admin, recruiter, or reviewer");
  }
  if (status && !statuses.has(status)) {
    return validationError(next, "status must be active, suspended, or pending");
  }
  if (search !== undefined && typeof search !== "string") {
    return validationError(next, "search must be a string");
  }
  if (!Number.isInteger(pageNumber) || pageNumber < 1) {
    return validationError(next, "page must be a positive integer");
  }
  if (!Number.isInteger(limitNumber) || limitNumber < 1 || limitNumber > 100) {
    return validationError(next, "limit must be an integer between 1 and 100");
  }

  return next();
}

export function validateUserUpdate(request, _response, next) {
  const fields = Object.keys(request.body || {});
  const allowedFields = new Set(["role", "status"]);
  const hasInvalidField = fields.some((field) => !allowedFields.has(field));

  if (fields.length === 0) {
    return validationError(next, "At least one user field is required");
  }
  if (hasInvalidField) {
    return validationError(next, "Only role and status can be updated");
  }
  if (request.body.role && !roles.has(request.body.role)) {
    return validationError(next, "role must be admin, recruiter, or reviewer");
  }
  if (request.body.status && !statuses.has(request.body.status)) {
    return validationError(next, "status must be active, suspended, or pending");
  }

  return next();
}

function validationError(next, message) {
  const error = new Error(message);
  error.statusCode = 400;
  return next(error);
}