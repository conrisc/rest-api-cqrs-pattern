import Joi from 'joi'

export const restockProductSchema = Joi.object({
	productId: Joi.string().uuid().required(),
	restock: Joi.number().integer().positive().required(),
})
