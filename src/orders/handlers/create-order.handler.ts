import { randomUUID } from 'crypto'
import { LowdbService } from '../../infrastracture/database/lowdb.js'
import { CreateOrderCommand } from '../commands/create-order.command.js'
import { Order, ProductOrder } from '../models/order.model.js'
import { Product } from '../../products/models/product.model.js'
import { BadRequestError, NotFoundError } from '../../errors/general-errors.js'

export class CreateOrderHandler {
	async execute(command: CreateOrderCommand): Promise<string> {
		console.log('Creating new order. Command: ', command)
		const db = await LowdbService.getInstance()

		const { customerId, products: orderedProducts } = command

		const productSnapshots: ProductOrder[] = orderedProducts.map(({ productId, quantity }) => {
			const product = db.data.products.find((it) => it.id === productId)
			if (!product) throw new NotFoundError(`Product with 'id=${productId}' doesn't exist.`)
			if (product.stock < quantity)
				throw new BadRequestError(
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
