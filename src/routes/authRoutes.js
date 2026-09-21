import { Router } from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { validateRegister, validateLogin } from "../middleware/userValidation.js";

const authRouter = Router();

authRouter.post("/register", validateRegister, registerUser);
authRouter.post("/login", validateLogin, loginUser);

/*
TODO - TEAM MEMBERS
authRouter.post("/logout", ...);
authRouter.get("/me", ...);
authRouter.post("/forgot-password", ...);
authRouter.post("/reset-password", ...);
*/

export default authRouter;
