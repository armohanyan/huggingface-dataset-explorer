import { ApiEndPoint } from './../api-end-point.ts'
import {IDocUser, ITokens, IUser} from "../../interfaces/users.ts";

interface IResponse extends ITokens{
    user: IDocUser
}

export const AuthApi = {
    Register: (data: IUser) =>
        new ApiEndPoint<IResponse>({
            method: 'post',
            url: `auth/register`,
            data
        }),

    Login: (data: { email: string, password: string }) =>
        new ApiEndPoint<IResponse>({
            method: 'post',
            url: `auth/login`,
            data
        }),

    RefreshToken: (token: string) =>
        new ApiEndPoint<ITokens>({
            method: 'post',
            url: `auth/refresh-token`,
            data: {token}
        })
}
