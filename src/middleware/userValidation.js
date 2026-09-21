function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateRegister(request, response, next) {
  const { name, email, password } = request.body;

  if (!name || !email || !password) {
    return response.status(400).json({
      message: "Name, email and password are required",
    });
  }

  if (name.trim().length < 2) {
    return response.status(400).json({
      message: "Name must contain at least 2 characters",
    });
  }

  if (!isValidEmail(email)) {
    return response.status(400).json({
      message: "Please enter a valid email address",
    });
  }

  if (password.length < 6) {
    return response.status(400).json({
      message: "Password must contain at least 6 characters",
    });
  }

  next();
}

export function validateLogin(request, response, next) {
  const { email, password } = request.body;

  if (!email || !password) {
    return response.status(400).json({
      message: "Email and password are required",
    });
  }

  if (!isValidEmail(email)) {
    return response.status(400).json({
      message: "Please enter a valid email address",
    });
  }

  next();
}
