import Joi from "joi";

export const createRestaurantSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  address: Joi.string().min(5).max(255).required(),

  location: Joi.object({
    type: Joi.string().valid("Point").required(),

    coordinates: Joi.array()
      .items(Joi.number())
      .length(2)
      .required()
      .messages({
        "array.length": "Les coordonnées doivent être un tableau de [longitude, latitude]"
      })
  }).required()
});
