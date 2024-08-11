import { Request, Response } from 'express'
import { ListProductsHandler } from './handlers/list-products.handler.js'
import { ListProductsQuery } from './queries/list-products.query.js'
import { CreateProductCommand } from './commands/create-product.command.js'
import { CreateProductHandler } from './handlers/create-product.handler.js'

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
