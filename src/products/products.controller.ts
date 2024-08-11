import { Request, Response } from 'express'
import { ListProductsHandler } from './handlers/list-products.handler.js'
import { ListProductsQuery } from './queries/list-products.query.js'
import { CreateProductCommand } from './commands/create-product.command.js'
import { CreateProductHandler } from './handlers/create-product.handler.js'
import { RestockProductCommand } from './commands/restock-product.command.js'
import { RestockProductHandler } from './handlers/restock-product.handler.js'
import { SellProductCommand } from './commands/sell-product.command.js'
import { SellProductHandler } from './handlers/sell-product.handler.js'

export async function getProducts(req: Request, res: Response) {
	const query = new ListProductsQuery()
	const products = await new ListProductsHandler().handle(query)
	res.status(200).json(products)
}

export async function createProduct(req: Request, res: Response) {
	// TODO: Add validation
	const { name, description, price, stock } = req.body
	const command = new CreateProductCommand(name, description, price, stock)
	const productId = await new CreateProductHandler().execute(command)
	res.status(200).json({ id: productId })
}

export async function restockProduct(req: Request, res: Response) {
	// TODO: Add validation
	const id = req.params['id']
	const { restock } = req.body
	const command = new RestockProductCommand(id, restock)
	const newStock = await new RestockProductHandler().execute(command)
	res.status(200).json({ stock: newStock })
}

export async function sellProduct(req: Request, res: Response) {
	// TODO: Add validation
	const id = req.params['id']
	const { sell } = req.body
	const command = new SellProductCommand(id, sell)
	const newStock = await new SellProductHandler().execute(command)
	res.status(200).json({ stock: newStock })
}
