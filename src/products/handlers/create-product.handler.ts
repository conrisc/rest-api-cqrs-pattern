import { randomUUID } from 'crypto'
import { LowdbService } from '../../infrastracture/database/lowdb.js'
import { CreateProductCommand } from '../commands/create-product.command.js'
import { Product } from '../models/product.model.js'

export class CreateProductHandler {
	async execute(command: CreateProductCommand): Promise<string> {
		console.log('Creating new product. Command: ', command)
		const db = await LowdbService.getInstance()

		const { name, description, price, stock } = command

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
