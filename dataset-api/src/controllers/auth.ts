import {asyncErrorHandler} from "../helpers/express/async-error-handler";
import {Never} from "../interfaces/types";
import {HttpError} from "../helpers/http-error";
import UserModel from "../models/Users";
import {IDocUser, IUser} from "../interfaces/user";
import jwtHelper from "../helpers/jwt";
import {validateRegisterBody} from "../helpers/validation/auth";
import jwt from "../helpers/jwt";
import {RefreshTokenPayload} from "../interfaces/jwt-tokens";
import {AUTH_ACCESS_TOKEN_SECRET} from "../config";

export const registerController = asyncErrorHandler<
    Never,
    { user: IDocUser, refreshToken: string, accessToken: string },
    IUser
>(async (req, res) => {
    const {username, email, password, dateOfBirth, country} = req.body;

    const validationResult = validateRegisterBody(req.body)
    if (validationResult) {
        throw new HttpError(400, validationResult)
    }

    try {
        const findUser = await UserModel.findOne({ email })

        if (findUser) {
            throw new HttpError(400, 'User already exist!')
        }

        const user = new UserModel({username, email, password, dateOfBirth, country});

        const createdUser = await user.save();

        const accessToken = jwtHelper.getAccessToken(createdUser._id)
        const refreshToken = jwtHelper.getRefreshToken(createdUser._id)

        delete createdUser.password

        res.json({
            user: createdUser,
            refreshToken,
            accessToken
        })
    } catch (error) {
        throw error instanceof HttpError ? new HttpError(error.httpStatus, error.message) : new HttpError(500, 'Failed to register user')
    }
})

export const loginController = asyncErrorHandler<
    Never,
    { user: IDocUser, refreshToken: string, accessToken: string },
    { email: string, password: string}
>(async (req, res) => {
    const {email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email })

        if (!user) {
            throw new HttpError(400, 'Incorrect email/password')
        }

        // @ts-ignore
        const passwordMatch = await user.comparePassword(password);

        if (!passwordMatch) {
            throw new HttpError(400, 'Incorrect email/password')
        }

        const accessToken = jwtHelper.getAccessToken(user._id)
        const refreshToken = jwtHelper.getRefreshToken(user._id)

        res.json({
            user,
            refreshToken,
            accessToken
        })
    } catch (error) {
        throw error instanceof HttpError ? new HttpError(error.httpStatus, error.message) : new HttpError(500, 'Failed to login')
    }
})

export const refreshTokenController = asyncErrorHandler<
    Never,
    { refreshToken: string, accessToken: string },
    { token: string}
>(async (req, res) => {
    const { token } = req.body;

    try {

        if (!token) {
            throw new HttpError(400, 'Missing token')
        }

        const payload = jwt.readToken<RefreshTokenPayload>(req.body.token, AUTH_ACCESS_TOKEN_SECRET)

        if (payload.expires < Date.now()) {
            throw new HttpError(400, 'Refresh token expired')
        }

        const accessToken = jwtHelper.getAccessToken(payload.userId)
        const refreshToken = jwtHelper.getRefreshToken(payload.userId)

        res.json({
            refreshToken,
            accessToken
        })
    } catch (error) {
        throw error instanceof HttpError ? new HttpError(error.httpStatus, error.message) : new HttpError(500, 'Failed to refresh token')
    }
})