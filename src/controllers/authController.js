import jwt from "jsonwebtoken";
import User from "../models/User.js";

function createToken(user) {
  return jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
}

function setAuthCookie(response, token) {
  const isProduction = process.env.NODE_ENV === "production";

  response.cookie("cv_screening_token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

// Yuwantha task: Register API
export async function registerUser(request, response, next) {
  try {
    const { name, email, password } = request.body;

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return response.status(409).json({
        message: "User already exists with this email",
      });
    }

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase(),
      password,
    });

    const token = createToken(user);
    setAuthCookie(response, token);

    return response.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Yuwantha task: Login API
export async function loginUser(request, response, next) {
  try {
    const { email, password } = request.body;

    const user = await User.findOne({
      email: email.toLowerCase(),
    }).select("+password");

    if (!user) {
      return response.status(401).json({
        message: "Invalid email or password",
      });
    }

    if (user.status !== "Active") {
      return response.status(403).json({
        message: "User account is inactive",
      });
    }

    const passwordMatches = await user.comparePassword(password);

    if (!passwordMatches) {
      return response.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = createToken(user);
    setAuthCookie(response, token);

    return response.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    next(error);
  }
}

/*
TODO - TEAM MEMBERS
- Logout API
- /auth/me API
- Forgot Password API
- Reset Password API
- Role authorization
*/
