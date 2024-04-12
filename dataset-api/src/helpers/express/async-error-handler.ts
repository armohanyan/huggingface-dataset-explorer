import { Request, Response, RequestHandler, NextFunction } from 'express'
import {Never} from "../../interfaces/types";

export const asyncErrorHandler = <RouteParams = Never, ResBody = void, ReqBody = void, RouteQuery = Never>(
	handler: (
		req: Request<RouteParams, ResBody, ReqBody, RouteQuery, Never>,
		res: Response<ResBody, Never>,
		next: NextFunction
	) => Promise<void>
): RequestHandler<RouteParams, ResBody, ReqBody, RouteQuery> => {
	const result: RequestHandler<RouteParams, ResBody, ReqBody, RouteQuery> = async (req, res, next) => {
		try {
			await handler(req, res, next)
		} catch (err) {
			next(err)
		}
	}

	return result
}
