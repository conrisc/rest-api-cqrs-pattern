import { randomUUID } from 'crypto'
import { LowdbService } from '../../infrastracture/database/lowdb.js'
import { CreateProductCommand } from '../commands/create-product.command.js'
import { Product } from '../models/product.model.js'

export class CreateProductHandler {
	async execute(command: CreateProductCommand): Promise<string> {
		console.log('Creating new product. Command: ', command)
		const db = await LowdbService.getInstance()

		const { name, description, price, stock } = command
		if (!name) throw Error('"name" is required.')
		if (!description) throw Error('"description" is required.')
		if (!price) throw Error('"price" is required.')
		if (!stock) throw Error('"stock" is required.')

		if (name.length > 50) throw Error('"name" cannot be longer than 50 characters.')
		if (description.length > 50) throw Error('"description" cannot be longer than 50 characters.')
		if (price <= 0) throw Error('"price" must be greater than 0.')
		if (stock <= 0) throw Error('"stock" must be greater than 0.')

		const newProduct: Product = {
			id: randomUUID(),
			name,
			description,
			price,
			stock,
		}
		await db.update(({ products }) => {
			products.push(newProduct)
		})
		return newProduct.id
	}
}
