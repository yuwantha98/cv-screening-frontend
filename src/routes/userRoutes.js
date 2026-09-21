import express from "express";
import { getProfile, updateProfile } from "../controllers/userController.js";
import verifyToken from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

// Protected Profile Routes (Accessible by authenticated HR Managers / Admins)
router.get("/profile", verifyToken, getProfile);
router.put("/profile", verifyToken, updateProfile);

// Example of Role-based Route (Only Admin can access)
router.get("/admin-dashboard", verifyToken, authorizeRoles("Admin"), (req, res) => {
  res.json({ message: "Welcome to the Admin Dashboard" });
});

export default router;