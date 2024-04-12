import {useForm, Controller} from 'react-hook-form';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Password} from 'primereact/password';
import {classNames} from 'primereact/utils';
import './Login.css';
import {error, refreshTokensLoop, setAuth} from "../../store";
import {Api} from "../../api ";
import {isAxiosError} from "axios";
import {useNavigate} from "react-router-dom";
import { useAppDispatch } from '../../hooks/appDisplatch';

const LoginView = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const defaultValues = {
        email: '',
        password: '',
    };

    const {control, formState, handleSubmit} = useForm({defaultValues});
    const errors = formState.errors as { [key: string]: { message: string } }

    const onSubmit = async (data: { email: string, password: string }) => {
        try {
            const response = await Api.Auth.Login(data).requestData()

            dispatch(setAuth(response));
            dispatch(refreshTokensLoop())

            navigate('/')
        } catch (err) {
            if (isAxiosError(err) && err.response?.data) {
                dispatch(error({summary: 'Failed:', detail: err.response.data.message, sticky: true}))
            } else {
                dispatch(error({summary: 'Failed: ', detail: 'Please try again later ! later', sticky: true}))
            }
        }
    }

    const getFormErrorMessage = (name: string) => errors[name] &&
        <small className="p-error">{errors[name].message}</small>

    return (
        <div className="login-inner mt-4">
            <div className="flex justify-content-center">
                <div className="card">
                    <h5 className="text-center">Login</h5>

                    <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                        <div className="field">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope"/>
                                <Controller name="email" control={control}
                                            rules={{
                                                required: 'Email is required.',
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                    message: 'Invalid email address. E.g. example@email.com'
                                                }
                                            }}
                                            render={({field, fieldState}) => (
                                                <InputText id={field.name} {...field}
                                                           className={classNames({'p-invalid': fieldState.invalid})}/>
                                            )}/>
                                <label htmlFor="email"
                                       className={classNames({'p-error': !!errors.email})}>Email*</label>
                            </span>
                            {getFormErrorMessage('email')}
                        </div>

                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="password" control={control}
                                            rules={{required: 'Password is required.'}}
                                            render={({field, fieldState}) => (
                                                <Password id={field.name} {...field} toggleMask
                                                          className={classNames({' p-invalid': fieldState.invalid})}
                                                          feedback={false} tabIndex={1}/>
                                            )}/>
                                <label htmlFor="password"
                                       className={classNames({'p-error': errors.password})}>Password*</label>
                            </span>
                            {getFormErrorMessage('password')}
                        </div>

                        <Button type="submit" label="Submit" className="mt-2"/>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginView