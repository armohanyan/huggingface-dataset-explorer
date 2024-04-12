import { Card } from 'primereact/card';
import {IDataset} from "../../interfaces/datasets.ts";
import React from "react";
import {Chip} from "primereact/chip";
import {Button} from "primereact/button";
import {useSelector} from "react-redux";
import {selectIsAuthenticated} from "../../store";
import {useNavigate} from "react-router-dom";
import '../../index.css';

const DatasetCard: React.FC<{ dataset: IDataset}> = ({dataset}) => {
    const downloads = dataset.downloads.toString()
    const likes = dataset.likes.toString()
    const isAuthUser = useSelector(selectIsAuthenticated)
    const navigate = useNavigate();

    const updateDate = () => {

        const timestamp = dataset.lastModified;
        const lastModified = new Date(timestamp);

        const difference = Date.now() - lastModified.getTime();

        const minutesAgo = Math.floor(difference / (1000 * 60));
        const hoursAgo = Math.floor(difference / (1000 * 60 * 60));
        const daysAgo = Math.floor(difference / (1000 * 60 * 60 * 24));
        const monthsAgo = Math.floor(difference / (1000 * 60 * 60 * 24 * 30));

        let timeAgo;
        if (minutesAgo < 60) {
            timeAgo = `Updated ${minutesAgo} min ago`;
        } else if (hoursAgo < 24) {
            timeAgo = `Updated ${hoursAgo} hours ago`;
        } else if (daysAgo < 30) {
            timeAgo = `Updated ${daysAgo} days ago`;
        } else {
            timeAgo = `Updated ${monthsAgo} months ago`;
        }

        // todo: include year ?

        return timeAgo
    }

    const onClickViewDetails = () => {
        navigate({
            pathname: 'dataset',
            search: '?id=' + dataset.id,
        })
    }
    const footer = isAuthUser ?  (
        <div className="flex justify-content-end">
            <Button label="View Details" className="p-button-sm" text onClick={onClickViewDetails}/>
        </div>
    ) : null;

    const title = dataset.id.length > 20 ?  dataset.id.slice(1, 20).concat('...') : dataset.id

    return (
        <div>
            <Card title={title} style={{ width: '25em', height: '15.5em'}} footer={footer}  className="card-inner shadow-3 overflow-auto">
                <div className="flex align-items-center flex-wrap">
                    <Chip label={dataset.author} icon="pi pi-user" className="mr-2 mb-2"/>
                    <Chip label={downloads} icon="pi pi-download" className="mr-2 mb-2"/>
                    <Chip label={likes} icon="pi pi-heart" className="mr-2 mb-2"/>
                    <Chip label={updateDate()} icon="pi pi-clock" className="mr-2 mb-2"/>
                </div>
            </Card>
        </div>
    )
}

export default DatasetCard