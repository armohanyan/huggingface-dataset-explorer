import { Document } from 'mongoose';
export interface IDocUser extends Document  {
    username: string
    email: string
    password?: string
    dateOfBirth: Date | null
    country: string | null
}

export interface IUser {
    username: string
    email: string
    password?: string
    dateOfBirth: Date | null
    country: string | null
}


