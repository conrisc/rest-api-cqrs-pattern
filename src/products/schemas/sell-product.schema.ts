import Joi from 'joi'

export const sellProductSchema = Joi.object({
	productId: Joi.string().uuid().required(),
	sell: Joi.number().integer().positive().required(),
})
