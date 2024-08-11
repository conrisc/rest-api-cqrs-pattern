import { LowdbService } from '../../infrastracture/database/lowdb.js'
import { Product } from '../models/product.model.js'
import { SellProductCommand } from '../commands/sell-product.command.js'

export class SellProductHandler {
	async execute(command: SellProductCommand): Promise<number> {
		console.log('Selling product. Command: ', command)
		const db = await LowdbService.getInstance()
		const product = db.data.products.find((it) => it.id === command.productId)
		if (product) {
			if (product.stock < command.sell)
				throw Error(`Cannot sell ${command.sell} products, there are only ${product.stock} available.`)
			const newStock = product.stock - command.sell
			const updatedProduct: Product = {
				...product,
				stock: newStock,
			}
			db.data.products = db.data.products.map((it) => (it.id === command.productId ? updatedProduct : it))
			db.write()
			return newStock
		}

		throw Error(`Product with id='${command.productId}' doesn't exist.`)
	}
}
