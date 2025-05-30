import Joi from 'joi'


const bookValidator = Joi.object({
        title: Joi.string().min(3).max(50).required()
            .messages({
                'string.empty': 'The title is required',
                'string.min': 'The title must at least 3 characters'
            }),
        author: Joi.string().min(3).max(50),
        description: Joi.string().min(5).allow(''),
        published_year: Joi.number().integer(),
        category_id: Joi.string().allow(null, ''), 
        stock: Joi.number().integer().min(0).required()
    }
)

export {
    bookValidator
}