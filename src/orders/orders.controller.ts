import { NextFunction, Request, Response } from 'express'
import { CreateOrderCommand } from './commands/create-order.command.js'
import { CreateOrderHandler } from './handlers/create-order.handler.js'
import { createOrderSchema } from './schemas/create-order.schema.js'
import { BadRequestError } from '../errors/general-errors.js'

export async function createOrder(req: Request, res: Response, next: NextFunction) {
	const { error, value } = createOrderSchema.validate(req.body)
	if (error) {
		return next(new BadRequestError(error.details[0].message))
	}

	const { customerId, products } = value
	try {
		const command = new CreateOrderCommand(customerId, products)
		const productId = await new CreateOrderHandler().execute(command)
		res.status(200).json({ id: productId })
	} catch (err) {
		return next(err)
	}
}
