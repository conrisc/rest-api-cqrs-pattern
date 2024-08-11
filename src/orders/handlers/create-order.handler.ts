import { randomUUID } from 'crypto'
import { LowdbService } from '../../infrastracture/database/lowdb.js'
import { CreateOrderCommand } from '../commands/create-order.command.js'
import { Order, ProductOrder } from '../models/order.model.js'
import { Product } from '../../products/models/product.model.js'

export class CreateOrderHandler {
	async execute(command: CreateOrderCommand): Promise<string> {
		console.log('Creating new order. Command: ', command)
		const db = await LowdbService.getInstance()

		const { customerId, products: orderedProducts } = command
		if (!customerId) throw Error('"customerId" is required.')
		if (orderedProducts.length === 0) throw Error('Cannot create order without "products".')
		if (orderedProducts.some((it) => it.quantity <= 0))
			throw Error("Cannot create order with a product's quantity below 1.")

		const productSnapshots: ProductOrder[] = orderedProducts.map(({ productId, quantity }) => {
			const product = db.data.products.find((it) => it.id === productId)
			if (!product) throw Error(`Product with 'id=${productId}' doesn't exist.`)
			if (product.stock < quantity)
				throw Error(
					`Not enough products (id=${productId}) in stok. Ordered: ${quantity}. In stock: ${product.stock}.`
				)

			return {
				quantity,
				product: {
					id: product.id,
					name: product.name,
					description: product.description,
					price: product.price,
				},
			}
		})

		const updatedProducts: Product[] = db.data.products.map((product) => {
			const productOrder = orderedProducts.find((it) => it.productId === product.id)
			return productOrder
				? {
						...product,
						stock: product.stock - productOrder.quantity,
					}
				: product
		})

		const newOrder: Order = {
			id: randomUUID(),
			customerId,
			products: productSnapshots,
		}
		db.data.products = updatedProducts
		db.data.orders.push(newOrder)
		await db.write()

		return newOrder.id
	}
}
