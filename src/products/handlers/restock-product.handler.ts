import { LowdbService } from '../../infrastracture/database/lowdb.js'
import { RestockProductCommand } from '../commands/restock-product.command.js'
import { Product } from '../models/product.model.js'

export class RestockProductHandler {
	async execute(command: RestockProductCommand): Promise<number> {
		console.log('Restocking product. Command: ', command)
		if (command.restock <= 0) throw Error('Cannot restock 0 or less products.')
		const db = await LowdbService.getInstance()
		const product = db.data.products.find((it) => it.id === command.id)
		if (product) {
			const newStock = product.stock + command.restock
			const updatedProduct: Product = {
				...product,
				stock: newStock,
			}
			db.data.products = db.data.products.map((it) => (it.id === command.id ? updatedProduct : it))
			db.write()
			return newStock
		}

		throw Error(`Product with id='${command.id}' doesn't exist.`)
	}
}
