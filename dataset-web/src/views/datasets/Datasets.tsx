import DatasetCard from "../../components/datasets/cards.tsx";
import {useEffect, useState} from "react";
import {Api} from "../../api ";
import {IDataset} from "../../interfaces/datasets.ts";
import {Paginator} from "primereact/paginator";
import {ProgressSpinner} from "primereact/progressspinner";
import {error} from "../../store";
import {useDispatch} from "react-redux";

const DatasetsView = () => {
    const dispatch = useDispatch();

    const [page, setPage] = useState(0);
    const [rows, setRows] = useState(30);
    const [first, setFirst] = useState(0);

    const [totalRecords, setTotalRecords] = useState(0);
    const [datasets, setDatasets] = useState<IDataset[]>([])

    useEffect(() => {
        setDatasets([])

        Api.Datasets.Get({page}).requestData().then(data => {
            setDatasets(data.datasets)
            setTotalRecords(data.numTotalItems)
        }).catch(() => {
            dispatch(error({detail: "Failed to load datasets, please try later", sticky: true, summary: 'Error:'}))
        })
    }, [page]);

    const onBasicPageChange = (event: { page: number, first: number, rows: number }) => {
        setPage(event.page);
        setRows(event.rows);
        setFirst(event.first);
    }

    return (
        <div>
            <div className='flex justify-content-center gap-4 flex-wrap mt-4'>
                {
                    datasets.length ? datasets.map((dataset) => <DatasetCard dataset={dataset} key={dataset.id}/>) :
                        <ProgressSpinner/>
                }
            </div>

            <div className='mt-5'>
                <Paginator first={first} rows={rows} totalRecords={totalRecords}
                           onPageChange={onBasicPageChange}></Paginator>
            </div>

        </div>

    )
}

export default DatasetsView