const User = require("../models/User");
const bcrypt = require("bcryptjs");

// 1. Get User Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// 2. Update User Profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();
    res.json({ message: "Profile updated successfully", user: { name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// 3. Forgot Password API (Mock implementation generating a reset token)
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User with this email does not exist" });
    }

    // Generate a simple reset token (In production, use crypto and send via email service like Nodemailer)
    const resetToken = bcrypt.hashSync(user._id.toString(), 10).replace(/[/\\$]/g, "");
    
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour validity
    await user.save();

    // For development/testing, returning the token in response
    res.json({ 
      message: "Password reset token generated successfully", 
      resetToken // In real production apps, this goes to the user's email, not the response
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};