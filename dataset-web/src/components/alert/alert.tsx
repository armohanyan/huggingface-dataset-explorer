import '../../index.css';
import {useEffect, useRef} from 'react';
import {Messages} from 'primereact/messages';
import {clear} from "../../store";
import { useDispatch, useSelector } from 'react-redux';
import {useLocation} from "react-router-dom";
import {IAlertMessage} from "../../interfaces/alert.ts";

const MessagePrompt = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const alert = useSelector((x: { alert: null | {value: IAlertMessage | null }})   => x.alert?.value)
    const ref = useRef<Messages>(null);


    useEffect(() => {
        ref.current?.clear()

        if (alert)  {
            ref.current?.show([alert]);
        }
    }, [alert]);

    useEffect(() => {
        dispatch(clear());
    }, [location]);

    return (
        <div className="card">
            <Messages ref={ref} />
        </div>
    )
}

export default MessagePrompt
