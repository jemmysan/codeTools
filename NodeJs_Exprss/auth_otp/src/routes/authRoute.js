import express from 'express';
import { register, login, logout } from '../controllers/authentification/authController.js';
import { verifyOTP } from '../utils/auth/verifyOTP.js';


const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/otp-verification", verifyOTP);
authRouter.post("/login", login);
authRouter.post("/log-out", logout);


export default authRouter;