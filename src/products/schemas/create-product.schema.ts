import Joi from 'joi'

export const createProductSchema = Joi.object({
	name: Joi.string().min(3).max(50).required(),
	description: Joi.string().min(3).max(50).required(),
	price: Joi.number().positive().precision(2).required(),
	stock: Joi.number().integer().positive().required(),
})
