import Joi from 'joi'

const signUpValidator = Joi.object({
    fullname: Joi.string()
      .min(3)
      .max(100)
      .required()
      .messages({
        'string.empty': 'Le nom complet est requis',
        'string.min': 'Le nom complet doit contenir au moins 3 caractères',
      }),
  
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Adresse email invalide',
        'string.empty': 'L’email est requis',
      }),
  
    password: Joi.string()
      .min(8)
      .required()
      .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&._-])[A-Za-z\\d@$!%*#?&._-]{8,}$"))
      .messages({
        'string.pattern.base': 'Le mot de passe doit contenir au moins une lettre, un chiffre et un caractère spécial',
        'string.min': 'Le mot de passe doit contenir au moins 8 caractères',
        'string.empty': 'Le mot de passe est requis',
      }),
  });


  const signinValidator = Joi.object({
   
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Adresse email invalide',
        'string.empty': 'L’email est requis',
      }),
  
    password: Joi.string()
      .min(8)
      .required()
      .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&._-])[A-Za-z\\d@$!%*#?&._-]{8,}$"))
      .messages({
        'string.pattern.base': 'Le mot de passe doit contenir au moins une lettre, un chiffre et un caractère spécial',
        'string.min': 'Le mot de passe doit contenir au moins 8 caractères',
        'string.empty': 'Le mot de passe est requis',
      }),
  });





export {
    signUpValidator,
    signinValidator 
}