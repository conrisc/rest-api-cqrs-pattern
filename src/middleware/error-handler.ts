import { Request, Response, NextFunction } from 'express'
import { BadRequestError, NotFoundError, InternalServerError } from '../errors/general-errors.js'

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	// eslint-disable-next-line
	next: NextFunction
): Response => {
	if (err instanceof BadRequestError || err instanceof NotFoundError) {
		return res.status(err.status).json({ message: err.message })
	}

	console.error(err)
	const serverError = new InternalServerError()
	return res.status(serverError.status).json({ message: serverError.message })
}
