import { Joi } from 'express-joi-validations';

const registerValidation = Joi.object({
    name : Joi.string().min(3).max(50).required,
    email : Joi.string().email().required,
    password : Joi.string().min(6).required
})

const loginValidation = Joi.object({
    email : Joi.string().required,
    password : Joi.string().required
})


export { registerValidation, loginValidation }