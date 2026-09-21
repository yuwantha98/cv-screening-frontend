import User from "../models/User.js";
import bcrypt from "bcryptjs";

// 1. Get User Profile
export const getProfile = async (req, res, next) => {
  try {
    const userId = req.user?.userId || req.user?.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    if (typeof next === "function") return next(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// 2. Update User Profile
export const updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const userId = req.user?.userId || req.user?.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email ? email.toLowerCase() : user.email;

    await user.save();
    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (err) {
    if (typeof next === "function") return next(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// 3. Forgot Password (Optional here if already handled in authController)
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({ message: "User with this email does not exist" });
    }

    const resetToken = bcrypt.hashSync(user._id.toString(), 10).replace(/[/\\$]/g, "");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour validity
    await user.save({ validateBeforeSave: false });

    return res.status(200).json({
      message: "Password reset token generated successfully",
      resetToken,
    });
  } catch (err) {
    if (typeof next === "function") return next(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};