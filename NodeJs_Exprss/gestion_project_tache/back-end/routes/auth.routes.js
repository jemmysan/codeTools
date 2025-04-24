import express from 'express'
import {validate} from '../middlewares/validate.middleware.js'
import {registerValidation, loginValidation} from '../validations/user.validation.js'
import { register, login} from '../controllers/auth.controller.js'

const authRouter = express.Router();

authRouter.post('/register', validate(registerValidation), register);
authRouter.post('/login', validate(loginValidation), login); 

export default authRouter;
