import User from '../models/Users';
import {IDocUser} from "../interfaces/user";
import {asyncErrorHandler} from "../helpers/express/async-error-handler";
import jwtHelper from "../helpers/jwt";
import {AccessTokenPayload} from "../interfaces/jwt-tokens";
import  {AUTH_ACCESS_TOKEN_SECRET} from "../config";
import {HttpError} from "../helpers/http-error";

export default asyncErrorHandler<any, any, any, any>(async (req, res, next) => {
    const { token: textToken } = req.query
    let token: string | undefined

    if (req.headers.authorization) {
        token = jwtHelper.extractToken(req.headers.authorization)
    } else if (textToken) {
        token = textToken as string
    }

    if (token) {
        const payload = jwtHelper.readToken<AccessTokenPayload>(token, AUTH_ACCESS_TOKEN_SECRET, jwtHelper.validateAccessTokenPayload)

        // @ts-ignore
        req.accessTokenPayload = payload

        try {
            const user: IDocUser | null = await User.findById(payload.userId);

            if (user) {
                // @ts-ignore
                req.user = user;

                return next()
            }

        } catch (err) {
            console.error(err)
        }
    }

    throw new HttpError(401)
})


