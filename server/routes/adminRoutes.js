import { Router } from "express";
import { getDashboard, getUsers, updateUser } from "../controllers/adminController.js";
import { requireAdmin } from "../middleware/adminMiddleware.js";
import { validateUserFilters, validateUserUpdate } from "../middleware/userValidation.js";

const adminRouter = Router();

adminRouter.use(requireAdmin);
adminRouter.get("/dashboard", getDashboard);
adminRouter.get("/users", validateUserFilters, getUsers);
adminRouter.patch("/users/:userId", validateUserUpdate, updateUser);

export default adminRouter;