export interface AccessTokenPayload {
    userId: string
    date: number
    expires: number
}

export interface RefreshTokenPayload {
    userId: string
    date: number
    expires: number
}
