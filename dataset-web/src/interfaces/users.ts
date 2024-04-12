export interface IUser {
    username: string
    email: string
    dateOfBirth: Date | null
    country: string | null
    refreshToken: string
    accessToken: string
}

export interface IDocUser {
    username: string
    email: string
    dateOfBirth: Date | null
    country: string | null
    refreshToken: string
    accessToken: string
    _id: string
}

export interface ITokens {
    refreshToken: string,
    accessToken: string
}