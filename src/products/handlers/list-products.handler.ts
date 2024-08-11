import { LowdbService } from '../../infrastracture/database/lowdb'
import { Product } from '../models/product.model'
import { ListProductsQuery } from '../queries/list-products.query'

export class ListProductsHandler {
	async handle(query: ListProductsQuery): Promise<Product[]> {
		console.log('Retrieving all products. Query', query)
		const db = await LowdbService.getInstance() // TODO: should be injected once
		return db.data.products
	}
}
