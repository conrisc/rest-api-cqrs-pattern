import { NextFunction, Request, Response } from 'express'
import { ListProductsHandler } from './handlers/list-products.handler.js'
import { ListProductsQuery } from './queries/list-products.query.js'
import { CreateProductCommand } from './commands/create-product.command.js'
import { CreateProductHandler } from './handlers/create-product.handler.js'
import { RestockProductCommand } from './commands/restock-product.command.js'
import { RestockProductHandler } from './handlers/restock-product.handler.js'
import { SellProductCommand } from './commands/sell-product.command.js'
import { SellProductHandler } from './handlers/sell-product.handler.js'
import { createProductSchema } from './schemas/create-product.schema.js'
import { restockProductSchema } from './schemas/restock-product.schema.js'
import { sellProductSchema } from './schemas/sell-product.schema.js'
import { BadRequestError } from '../errors/general-errors.js'

export async function getProducts(req: Request, res: Response, next: NextFunction) {
	try {
		const query = new ListProductsQuery()
		const products = await new ListProductsHandler().handle(query)
		res.status(200).json(products)
	} catch (err) {
		return next(err)
	}
}

export async function createProduct(req: Request, res: Response, next: NextFunction) {
	const { error, value } = createProductSchema.validate(req.body)
	if (error) {
		return next(new BadRequestError(error.details[0].message))
	}

	const { name, description, price, stock } = value
	try {
		const command = new CreateProductCommand(name, description, price, stock)
		const productId = await new CreateProductHandler().execute(command)
		res.status(200).json({ id: productId })
	} catch (err) {
		return next(err)
	}
}

export async function restockProduct(req: Request, res: Response, next: NextFunction) {
	const input = {
		productId: req.params['id'],
		restock: req.body.restock,
	}
	const { error } = restockProductSchema.validate(input)
	if (error) {
		return next(new BadRequestError(error.details[0].message))
	}

	try {
		const command = new RestockProductCommand(input.productId, input.restock)
		const newStock = await new RestockProductHandler().execute(command)
		res.status(200).json({ stock: newStock })
	} catch (err) {
		return next(err)
	}
}

export async function sellProduct(req: Request, res: Response, next: NextFunction) {
	const input = {
		productId: req.params['id'],
		sell: req.body.sell,
	}
	const { error } = sellProductSchema.validate(input)
	if (error) {
		return next(new BadRequestError(error.details[0].message))
	}

	try {
		const command = new SellProductCommand(input.productId, input.sell)
		const newStock = await new SellProductHandler().execute(command)
		res.status(200).json({ stock: newStock })
	} catch (err) {
		return next(err)
	}
}
