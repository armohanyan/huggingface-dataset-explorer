import * as process from "process";
import dotenv from 'dotenv';
dotenv.config();

export const AUTH_REFRESH_TOKEN_SECRET = process.env.AUTH_REFRESH_TOKEN_SECRET || 'secret'
export const AUTH_ACCESS_TOKEN_SECRET = process.env.AUTH_ACCESS_TOKEN_SECRET || "secret"
export const MONGO_CLUSTER_URI = process.env.MONGO_CLUSTER_URI
export const APP_PORT = process.env.PORT || 3000