import express from 'express'
import {validate} from '../middlewares/validate.middleware.js'
import {registerValidation, loginValidation} from '../validations/user.validation.js'
import { register, login} from '../controllers/auth.controller.js'

const authRoutes = express.Router();

authRoutes.post('/register', validate(registerValidation), register);
authRoutes.post('/login', validate(loginValidation), login); 

export default authRoutes;
