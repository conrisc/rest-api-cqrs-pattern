import { Low } from 'lowdb/lib'
import { JSONFilePreset } from 'lowdb/node'
import { Product } from '../../products/models/product.model.js'
import { Order } from '../../orders/models/order.model.js'

const DB_FILE_NAME = process.env.DB_FILE_NAME ?? 'db.json'

export interface Schema {
	products: Product[]
	orders: Order[]
}

const defaultData: Schema = { products: [], orders: [] }

export class LowdbService {
	private static instance: Low<Schema>

	private constructor() {}

	static async getInstance(): Promise<Low<Schema>> {
		if (!this.instance) {
			this.instance = await JSONFilePreset(DB_FILE_NAME, defaultData)
		}
		return this.instance
	}
}
