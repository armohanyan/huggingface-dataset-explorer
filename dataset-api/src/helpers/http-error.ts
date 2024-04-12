export class HttpError extends Error {
    constructor(
        public readonly httpStatus: number,
        message?: string,
        options?: ErrorOptions
    ) {
        super(message, options)
    }
}
