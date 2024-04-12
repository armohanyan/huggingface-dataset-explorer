import {asyncErrorHandler} from "../helpers/express/async-error-handler";
import {Never} from "../interfaces/types";
import {HttpError} from "../helpers/http-error";
import bcrypt from "bcrypt";
import UserModel from "../models/Users";
import {IDocUser, IUser} from "../interfaces/user";
import jwtHelper from "../helpers/jwt";
import {validateRegisterBody} from "../helpers/validation/auth";
import jwt from "../helpers/jwt";
import {RefreshTokenPayload} from "../interfaces/jwt-tokens";
import {AUTH_ACCESS_TOKEN_SECRET, AUTH_REFRESH_TOKEN_SECRET} from "../config";
import axios, {AxiosResponse} from "axios";
import {IDatasetInfo} from "../interfaces/datasets";
import datasets from "../routes/datasets";

const API_URL = 'https://datasets-server.huggingface.co/';

export const getDatasets = asyncErrorHandler<
    Never,
    any,
    any,
    { page: number }
>(async (req, res) => {
    const {page} = req.query

    try {
        const apiUrl = 'https://huggingface.co/datasets-json';

        const params = {
            p: page || 0,
        };

        const response: AxiosResponse = await axios.get(apiUrl, {params});

        res.json(response.data)
    } catch (error) {
        console.log(error)
        throw error instanceof HttpError ? new HttpError(error.httpStatus, error.message) : new HttpError(500, 'Failed get datasets')
    }
})

export const getDatasetInfo = asyncErrorHandler<
    Never,
    IDatasetInfo,
    Never,
    { dataset: string }
>(async (req, res) => {
    const {dataset} = req.query

    try {
        const params = {
            dataset,
            config: 'default'
        };

        const response: AxiosResponse = await axios.get(API_URL + 'info', {params});

        res.json(response.data.dataset_info.default)
    } catch (error) {
        throw error instanceof HttpError ? new HttpError(error.httpStatus, error.message) : new HttpError(500, 'Failed get dataset info')
    }
})

export const getDatasetRows = asyncErrorHandler<
    Never,
    IDatasetInfo,
    Never,
    {
        dataset: string
        config: string
        split: string
    }
>(async (req, res) => {
    const {dataset, config, split } = req.query

    try {
        if (!dataset) {
            throw new Error('dataset | config | split are required')
        }

        const params = {
            dataset,
            config,
            split
        };

        const response: AxiosResponse = await axios.get(API_URL + 'rows', {params});

        res.json(response.data)
    } catch (error) {
        throw error instanceof HttpError ? new HttpError(error.httpStatus, error.message) : new HttpError(500, 'Failed get dataset rows')
    }
})

export const getDatasetSplits = asyncErrorHandler<
    Never,
    {
        dataset: string,
        config: string,
        split: string
    }[],
    Never,
    { dataset: string }
>(async (req, res) => {
    const {dataset} = req.query

    try {
        if (!dataset) {
            throw new Error('Dataset id is required')
        }


        const params = {
            dataset,
        };

        const response: AxiosResponse = await axios.get(API_URL + 'splits', {params});

        res.json(response.data.splits)
    } catch (error) {
        throw error instanceof HttpError ? new HttpError(error.httpStatus, error.message) : new HttpError(500, 'Failed get dataset splits')
    }
})