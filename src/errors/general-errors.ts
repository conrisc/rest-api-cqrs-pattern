export class BadRequestError extends Error {
	status: number

	constructor(message: string) {
		super(message)
		this.status = 400
	}
}

export class NotFoundError extends Error {
	status: number

	constructor(message: string) {
		super(message)
		this.status = 404
	}
}

export class InternalServerError extends Error {
	status: number

	constructor(message: string = 'Internal Server Error') {
		super(message)
		this.status = 500
	}
}
