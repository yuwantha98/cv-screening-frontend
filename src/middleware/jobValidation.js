export function validateJobUpdate(req, res, next) {
  const { title, department, employmentType, status } = req.body;

  if (title && title.trim().length < 3) {
    return res.status(400).json({ message: "Job title must be at least 3 characters long" });
  }

  if (status && !["Draft", "Open", "Closed"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value (Allowed: Draft, Open, Closed)" });
  }

  next();
}