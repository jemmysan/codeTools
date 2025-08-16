import Joi from "joi";


//   npm install joi


export const updateLocationSchema = Joi.object({
  userId: Joi.string().required(),

  location: Joi.object({
    type: Joi.string().valid("Point").required(),

    coordinates: Joi.array()
      .items(Joi.number())
      .length(2)
      .required()
      .messages({
        "array.length": "Les coordonnées doivent être un tableau de [longitude, latitude]"
      }),

    address: Joi.object({
      full: Joi.string().allow(""),
      city: Joi.string().allow(""),
      postalCode: Joi.string().allow(""),
      country: Joi.string().allow("")
    }).optional(),

    source: Joi.string().valid("gps", "manual", "geocoded").required()
  }).required()
});
