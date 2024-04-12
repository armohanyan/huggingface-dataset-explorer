import React, {useEffect, useState} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import {CountryService} from "../../services/CountryService.ts";
import './Register.css';
import {error, refreshTokensLoop, setAuth} from "../../store";
import {Api} from "../../api ";
import {isAxiosError} from "axios";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../hooks/appDisplatch.ts";

interface IForm {
    username: string
    email: string
    password: string
    dateOfBirth: Date | null
    country: {
        value: string | null
        code: string | null
    }
}

const RegisterView = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const countriesService = new CountryService()

    const [countries, setCountries] = useState<{ name: string, code: string }[]>([]);

    const defaultValues = {
        username: '',
        email: '',
        password: '',
        dateOfBirth: null,
        country: {
            value: null,
            code: null,
        }
    };

    const { control, formState, handleSubmit } = useForm({ defaultValues });
    const errors = formState.errors as { [key: string]: { message: string } }

    useEffect(() => {
        setCountries(countriesService.getCountries)
    }, []);

    const onSubmit = async (data: IForm) => {
        try {
            const params = {
                ...data,
                country: data.country.value
            }

            const response = await Api.Auth.Register(params).requestData()

            dispatch(setAuth(response));
            dispatch(refreshTokensLoop())

            navigate('/')
        } catch(err) {
            if (isAxiosError(err) && err.response?.data) {
                dispatch(error({ summary: 'Failed:', detail: err.response.data.message, sticky: true}))
            } else {
                dispatch(error({summary: 'Failed: ', detail: 'Please try again later !', sticky: true}))
            }
        }
    };

    const getFormErrorMessage = (name: string) => errors[name] && <small className="p-error">{errors[name].message}</small>

    const passwordHeader = <h6>Pick a password</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </React.Fragment>
    );

    return (
        <div className="register-inner mt-4">
            <div className="flex justify-content-center">
                <div className="card">
                    <h5 className="text-center">Register</h5>

                    <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">

                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="username" control={control} rules={{ required: 'Username is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>Name*</label>
                            </span>
                            {getFormErrorMessage('name')}
                        </div>

                        <div className="field">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <Controller name="email" control={control}
                                            rules={{ required: 'Email is required.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address. E.g. example@email.com' }}}
                                            render={({ field, fieldState }) => (
                                                <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                            )} />
                                <label htmlFor="email" className={classNames({ 'p-error': !!errors.email })}>Email*</label>
                            </span>
                            {getFormErrorMessage('email')}
                        </div>

                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="password" control={control} rules={{ required: 'Password is required.' }} render={({ field, fieldState }) => (
                                    <Password id={field.name} {...field} toggleMask className={classNames({ 'p-invalid': fieldState.invalid })} header={passwordHeader} footer={passwordFooter} />
                                )} />
                                <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>Password*</label>
                            </span>
                            {getFormErrorMessage('password')}
                        </div>

                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="dateOfBirth" control={control} render={({ field }) => (
                                    <Calendar id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon />
                                )} />
                                <label htmlFor="date">Birthday</label>
                            </span>
                        </div>

                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="country" control={control} render={({ field }) => (
                                    <Dropdown id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} options={countries} optionLabel="name" />
                                )} />
                                <label htmlFor="country">Country</label>
                            </span>
                        </div>

                        <Button type="submit" label="Submit" className="mt-2" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterView