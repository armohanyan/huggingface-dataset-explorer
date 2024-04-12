import { ApiEndPoint } from './../api-end-point.ts'
import {IDataset, IDatasetInfo} from "../../interfaces/datasets.ts";

interface ISplit {
    dataset: string,
    config: string,
    split: string
}

interface IDatasetsGetRequest {
    datasets: IDataset[]
    numItemsPerPage: number
    numTotalItems: number
    pageIndex: number
}
interface IFeature {
    name: string;
    type: { dtype: string };
}

interface IRowItem {
    row: { [key: string]: string | number | object };
}

export const DatasetApi = {
    Get: (params: { page: number }) =>
        new ApiEndPoint<IDatasetsGetRequest>({
            method: 'get',
            url: `datasets`,
            params
        }, false),

    Info: (params: { dataset: string }) =>
        new ApiEndPoint<IDatasetInfo>({
            method: 'get',
            url: `datasets/info`,
            params
        }),

    Splits: (params: { dataset: string }) =>
        new ApiEndPoint<ISplit[]>({
            method: 'get',
            url: `datasets/splits`,
            params
        }),


    Rows: (params: ISplit) =>
        new ApiEndPoint<{ features: IFeature[], rows: IRowItem[] }>({
            method: 'get',
            url: `datasets/rows`,
            params
        })
}
