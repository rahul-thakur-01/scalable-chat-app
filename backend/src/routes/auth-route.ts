import { Router } from "express";
import authController from "../controllers/auth-controller.js";
const authRouter = Router();

authRouter.post('/login', authController.login);
authRouter.post('/verfity-otp/:otp_access_token', authController.verifyOtp);

export default authRouter;