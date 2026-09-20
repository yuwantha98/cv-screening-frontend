const express = require("express");
const router = express.Router();
const { getProfile, updateProfile } = require("../controllers/userController");
const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// Protected Profile Routes (Accessible by authenticated HR Managers / Admins)
router.get("/profile", verifyToken, getProfile);
router.put("/profile", verifyToken, updateProfile);

// Example of Role-based Route (Only Admin can access)
router.get("/admin-dashboard", verifyToken, authorizeRoles("Admin"), (req, res) => {
  res.json({ message: "Welcome to the Admin Dashboard" });
});

module.exports = router;