export class RestockProductCommand {
	constructor(
		public productId: string,
		public restock: number
	) {}
}
