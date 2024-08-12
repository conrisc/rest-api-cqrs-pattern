import { ProductOrder } from './product-order.model'

export interface Order {
	id: string
	customerId: string
	products: ProductOrder[]
}
