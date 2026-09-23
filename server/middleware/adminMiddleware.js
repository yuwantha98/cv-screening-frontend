export function requireAdmin(request, _response, next) {
  const role = request.user?.role || (
    process.env.NODE_ENV !== "production" ? request.get("x-user-role") : undefined
  );

  if (role !== "admin") {
    const error = new Error("Administrator access is required");
    error.statusCode = 403;
    return next(error);
  }

  return next();
}