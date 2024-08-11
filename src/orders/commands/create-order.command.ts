export class CreateOrderCommand {
	constructor(
		public customerId: string,
		public products: { productId: string; quantity: number }[]
	) {}
}
