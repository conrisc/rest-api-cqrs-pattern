import { ProductSnapshot } from './product-snapshot.model'

export interface ProductOrder {
	product: ProductSnapshot
	quantity: number
}
