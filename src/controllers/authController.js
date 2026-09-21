import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

function createToken(user) {
  return jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET || "supersecretjwtkey123",
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

// Register API
export async function registerUser(request, response, next) {
  try {
    const { name, email, password, role } = request.body;

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
      role: role || "USER",
    });

    const token = createToken(user);
    setAuthCookie(response, token);

    return response.status(201).json({
      message: "User registered successfully",
      token,
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

// Login API
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
      token,
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

// Forgot Password API 
export async function forgotPassword(request, response, next) {
  try {
    const { email } = request.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return response.status(404).json({
        message: "User with this email does not exist",
      });
    }

    // Generate reset token
    const resetToken = bcrypt
      .hashSync(user._id.toString(), 10)
      .replace(/[/\\$]/g, "");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour validity
    await user.save({ validateBeforeSave: false });

    return response.status(200).json({
      message: "Password reset token generated successfully",
      resetToken,
    });
  } catch (error) {
    next(error);
  }
}