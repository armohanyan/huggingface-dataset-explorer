import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {Api} from "../../api ";
import {Dropdown} from "primereact/dropdown";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {ProgressSpinner} from "primereact/progressspinner";
import {isAxiosError} from "axios";
import {error} from "../../store";
import {useDispatch} from "react-redux";

interface ISplit {
    dataset: string,
    config: string,
    split: string
}

interface IFeature {
    name: string;
    type: { dtype: string };
}

interface IRowItem {
    row: { [key: string]: string | number | object };
}

interface IDataRow {
    [key: string]: string | number;
}

const DatasetView = () => {
    const location = useLocation()
    const dispatch = useDispatch();

    const queryParams = new URLSearchParams(location.search);
    const datasetId = queryParams.get('id');
    const [splits, setDatasetSplits] = useState<ISplit[]>([])
    const [selectedSplit, setSelectedSplit] = useState<ISplit | null>(null)
    const [firstRow, setFirstRow] = useState<{ columns: IFeature[], rows: any[] } | null>(null)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        if (datasetId) {
            Api.Datasets.Splits({dataset: datasetId}).requestData().then(data => {
                setDatasetSplits(data)
                setSelectedSplit(data[0])
            }).catch((err) => {
                setIsError(true)

                if (isAxiosError(err) && err.response?.data) {
                    dispatch(error({summary: 'Failed:', detail: err.response.data.message, sticky: true}))
                } else {
                    dispatch(error({summary: 'Failed: ', detail: 'Please try again later !', sticky: true}))
                }
            })
        }
    }, [datasetId]);

    // todo: break into functions
    useEffect(() => {
        if (selectedSplit && datasetId) {
            Api.Datasets.Rows(selectedSplit).requestData().then(data => {
                const columnsMap: { [key: string]: string } = data.features.reduce((acc: {
                    [key: string]: string
                }, item: IFeature) => {
                    acc[item.name] = item.type?.dtype || 'object';
                    return acc;
                }, {});

                const rows: IDataRow[] = data.rows.map((item: IRowItem) => {
                    const row: IDataRow = {};
                    Object.entries(item.row).forEach(([key, value]) => {
                        const columnType = columnsMap[key];
                        if (columnType) {
                            if (columnType === 'int64') {
                                row[key] = value as number
                            } else {
                                row[key] = typeof value !== 'object' ?
                                    `${(value as string).slice(0, 30)}...` :
                                    `${JSON.stringify(value).slice(0, 30)}...`;
                            }
                        }
                    });

                    return row;
                });

                setFirstRow({rows, columns: data.features});
            }).catch((err) => {
                setIsError(true)

                if (isAxiosError(err) && err.response?.data) {
                    dispatch(error({summary: 'Failed:', detail: err.response.data.message, sticky: true}))
                } else {
                    dispatch(error({summary: 'Failed: ', detail: 'Please try again later !', sticky: true}))
                }
            })
        }
    }, [selectedSplit]);

    return (
        <>
            {
                !isError && <div>
                    <div className="m-3 flex justify-content-between align-items-center">
                        <h3>{datasetId}</h3>

                        <div className="flex align-items-center gap-3">
                            <div>Choose Split</div>
                            <Dropdown
                                value={selectedSplit} onChange={(e) => setSelectedSplit(e.value)} options={splits}
                                optionLabel="split"
                                placeholder="Select a Split"
                                className="w-full md:w-14rem"
                            />
                        </div>
                    </div>
                    <div className="mt-5">
                        {
                            firstRow ?
                                <div className="mt-2">
                                    <h3>Dataset Viewer</h3>
                                    <DataTable value={firstRow.rows} paginator
                                               paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                                               currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                                               rows={10} rowsPerPageOptions={[10, 20, 50]}
                                    >
                                        {
                                            firstRow.columns.map(col => <Column field={col.name} header={col.name}
                                                                                key={col.name} sortable filter></Column>)
                                        }
                                    </DataTable>
                                </div> :
                                <div className="flex justify-content-center mt-2">
                                    <ProgressSpinner/>
                                </div>
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default DatasetView