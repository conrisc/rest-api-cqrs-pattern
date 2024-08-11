export class RestockProductCommand {
	constructor(
		public id: string,
		public restock: number
	) {}
}
