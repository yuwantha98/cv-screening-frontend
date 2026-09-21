import { Router } from "express";
import { registerUser, loginUser, forgotPassword } from "../controllers/authController.js";
import { validateRegister, validateLogin } from "../middleware/userValidation.js";

const authRouter = Router();

authRouter.post("/register", validateRegister, registerUser);
authRouter.post("/login", validateLogin, loginUser);
authRouter.post("/forgot-password", forgotPassword);

export default authRouter;