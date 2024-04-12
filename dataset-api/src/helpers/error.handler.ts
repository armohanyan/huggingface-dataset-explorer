import { ErrorRequestHandler } from 'express'
import _ from 'lodash'
import {HttpError} from "./http-error";

export interface ErrorDescription {
    code?: string
    message?: string
    stack?: string
    innerErrors?: ErrorDescription[]
}

export interface ErrorResponse extends ErrorDescription {
    isError: true
}

function consoleLogErrorDeep(error: unknown) {
    try {
        if (!error) {
            return
        }

        console.error(error)

        if (_.isError(error)) {
            // @ts-ignore
            if (_.isArray(error.cause)) {
                // @ts-ignore
                for (const cause of error.cause) {
                    consoleLogErrorDeep(cause)
                }
            } else {
                // @ts-ignore
                consoleLogErrorDeep(error.cause)
            }
        }
    } catch {
        // ignore
    }
}

function makeErrorDescriptionDeep(error: unknown): ErrorDescription | undefined {
    if (!error) {
        return
    }

    const result: ErrorDescription = {}

    if (_.isError(error)) {
        // @ts-ignore
        result.message = error.message
        // @ts-ignore
        result.stack = error.stack

        // @ts-ignore
        const inners = _.isArray(error.cause) ? error.cause : [error.cause]

        result.innerErrors = _(inners)
            .map(i => makeErrorDescriptionDeep(i))
            .compact()
            .value()
    } else {
        result.message = JSON.stringify(error, undefined, 2)
    }

    return result
}

function makeErrorDescriptionSafe(error: unknown): ErrorDescription | undefined {
    try {
        return makeErrorDescriptionDeep(error)
    } catch {
        return {
            message: 'Converting error to string failed'
        }
    }
}

export const ErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }

    consoleLogErrorDeep(err)

    // todo: restrict error for PROD

    const response: ErrorResponse = {
        isError: true,
        message: _.isError(err) ? err.message : 'Unknown error',
        ...makeErrorDescriptionSafe(err)
    }

    res.status(err instanceof HttpError ? err.httpStatus : 500).send(response)
}
