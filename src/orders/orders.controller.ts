import { Request, Response } from 'express'
import { CreateOrderCommand } from './commands/create-order.command.js'
import { CreateOrderHandler } from './handlers/create-order.handler.js'
import { createOrderSchema } from './schemas/create-order.schema.js'

export async function createOrder(req: Request, res: Response) {
	const { error, value } = createOrderSchema.validate(req.body)
	if (error) {
		return res.status(400).json({ message: error.details[0].message })
	}
	const { customerId, products } = value
	const command = new CreateOrderCommand(customerId, products)
	const productId = await new CreateOrderHandler().execute(command)
	res.status(200).json({ id: productId })
}
