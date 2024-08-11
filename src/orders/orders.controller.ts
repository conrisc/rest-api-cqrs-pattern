import { Request, Response } from 'express'
import { CreateOrderCommand } from './commands/create-order.command.js'
import { CreateOrderHandler } from './handlers/create-order.handler.js'

export async function createOrder(req: Request, res: Response) {
	// TODO: Add validation
	const { customerId, products } = req.body
	const command = new CreateOrderCommand(customerId, products)
	const productId = await new CreateOrderHandler().execute(command)
	res.status(200).json({ id: productId })
}
