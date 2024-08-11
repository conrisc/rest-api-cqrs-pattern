import { LowdbService } from '../../infrastracture/database/lowdb.js'
import { Product } from '../models/product.model.js'
import { ListProductsQuery } from '../queries/list-products.query.js'

export class ListProductsHandler {
	async handle(query: ListProductsQuery): Promise<Product[]> {
		console.log('Retrieving all products. Query', query)
		const db = await LowdbService.getInstance() // TODO: should be injected once
		return db.data.products
	}
}
