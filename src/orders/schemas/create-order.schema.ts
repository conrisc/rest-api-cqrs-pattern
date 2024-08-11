import Joi from 'joi'

export const createOrderSchema = Joi.object({
	customerId: Joi.string().uuid().required(),
	products: Joi.array()
		.min(1)
		.items(
			Joi.object({
				productId: Joi.string().uuid().required(),
				quantity: Joi.number().integer().positive().required(),
			})
		),
})
