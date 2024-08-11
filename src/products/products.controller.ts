import { Request, Response } from 'express'
import { ListProductsHandler } from './handlers/list-products.handler.js'
import { ListProductsQuery } from './queries/list-products.query.js'

export async function getProducts(req: Request, res: Response) {
	const query = new ListProductsQuery()
	const products = await new ListProductsHandler().handle(query)
	res.status(200).json(products)
}
