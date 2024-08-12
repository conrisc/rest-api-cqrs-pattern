import { NotFoundError } from '../../errors/general-errors.js'
import { LowdbService } from '../../infrastracture/database/lowdb.js'
import { RestockProductCommand } from '../commands/restock-product.command.js'
import { Product } from '../models/product.model.js'

export class RestockProductHandler {
	async execute(command: RestockProductCommand): Promise<number> {
		console.log('Restocking product. Command: ', command)
		const db = await LowdbService.getInstance()
		const product = db.data.products.find((it) => it.id === command.productId)

		if (!product) throw new NotFoundError(`Product with id='${command.productId}' doesn't exist.`)

		const newStock = product.stock + command.restock
		const updatedProduct: Product = {
			...product,
			stock: newStock,
		}
		db.data.products = db.data.products.map((it) => (it.id === command.productId ? updatedProduct : it))
		db.write()
		return newStock
	}
}
