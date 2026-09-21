import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  // Retrieving the token via the Authorization header or cookies.
  let token = null;
  const authHeader = req.header("Authorization");

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else if (req.cookies && req.cookies.cv_screening_token) {
    token = req.cookies.cv_screening_token;
  }

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET || "supersecretjwtkey123"
    );
    req.user = verified; // Contains user id/userId and role
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

export default verifyToken;