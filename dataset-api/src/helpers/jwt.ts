import JWT, {JwtPayload} from 'jsonwebtoken'
import {AccessTokenPayload, RefreshTokenPayload} from "../interfaces/jwt-tokens";
import {isNumber, isString, isObject} from 'lodash'
import {AUTH_ACCESS_TOKEN_SECRET, AUTH_REFRESH_TOKEN_SECRET} from "../config";

export function isJwtPayload(payload: string | JwtPayload): payload is JwtPayload {
    return isObject(payload)
}

const jwtHelper = {
    extractToken(header: string) {
        let token = ''

        if (header.includes('Bearer')) {
            const index = header.indexOf('ey')
            token = header.substring(index)
        }

        return token
    },

    readToken<TPayload = void>(
        token: string,
        key: string,
        validate?: (payload: any) => payload is TPayload
    ): TPayload {
        const payload = JWT.verify(token, key)

        if (!isJwtPayload(payload)) {
            throw Error('Can not read token')
        }

        if (validate && !validate(payload)) {
            throw Error('Token payload is wrong')
        }

        return payload as TPayload
    },

    validateAccessTokenPayload(payload: any): payload is AccessTokenPayload {
        const userPayload = payload as AccessTokenPayload

        return isNumber(userPayload.expires) && isString(userPayload.userId)
    },

    getAccessToken(userId: string) {
        const date = Date.now()
        let expires = date + 5 * 60 * 1000 // 5 minutes in milliseconds


        const payload: AccessTokenPayload = {
            userId,
            date,
            expires,
        }

        return JWT.sign(payload, AUTH_ACCESS_TOKEN_SECRET)
    },

    getRefreshToken(userId: string) {
        const date = Date.now()
        const expires = date + 480 * 60 * 1000

        const payload: RefreshTokenPayload = {userId, date, expires}

        return JWT.sign(payload, AUTH_REFRESH_TOKEN_SECRET)
    }
}

export default jwtHelper

