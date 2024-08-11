import { ProductSnapshot } from './product-snapshot.model'

export interface Order {
	id: string
	customerId: string
	products: ProductOrder[]
}

export interface ProductOrder {
	// TODO: Find better name
	product: ProductSnapshot
	quantity: number
}
