import { randomUUID } from 'crypto'
import { LowdbService } from '../../infrastracture/database/lowdb.js'
import { CreateOrderCommand } from '../commands/create-order.command.js'
import { Order } from '../models/order.model.js'
import { Product } from '../../products/models/product.model.js'
import { BadRequestError, NotFoundError } from '../../errors/general-errors.js'
import { ProductOrder } from '../models/product-order.model.js'

export class CreateOrderHandler {
	async execute(command: CreateOrderCommand): Promise<string> {
		console.log('Creating new order. Command: ', command)
		const db = await LowdbService.getInstance()

		const { customerId, products: orderedProducts } = command
		const productOrders = this.createProductOrders(db.data.products, orderedProducts)
		const updatedProducts = this.getUpdatedProducts(db.data.products, productOrders)

		const newOrder: Order = {
			id: randomUUID(),
			customerId,
			products: productOrders,
		}

		db.data.products = updatedProducts
		db.data.orders.push(newOrder)
		await db.write()

		return newOrder.id
	}

	private createProductOrders(products: Product[], orderedProducts: CreateOrderCommand['products']): ProductOrder[] {
		return orderedProducts.map(({ productId, quantity }) => {
			const product = products.find((it) => it.id === productId)
			if (!product) throw new NotFoundError(`Product with 'id=${productId}' doesn't exist.`)
			if (product.stock < quantity)
				throw new BadRequestError(
					`Insufficient stock for product ID '${productId}'. Requested: ${quantity}. Available: ${product.stock}.`
				)

			return this.createProductOrder(product, quantity)
		})
	}

	private createProductOrder(product: Product, quantity: number): ProductOrder {
		return {
			quantity,
			product: {
				id: product.id,
				name: product.name,
				description: product.description,
				price: product.price,
			},
		}
	}

	private getUpdatedProducts(products: Product[], productOrders: ProductOrder[]): Product[] {
		return products.map((product) => {
			const productOrder = productOrders.find((it) => it.product.id === product.id)
			return productOrder
				? {
						...product,
						stock: product.stock - productOrder.quantity,
					}
				: product
		})
	}
}
