import '../../index.css';

import {Menubar} from 'primereact/menubar';
import {Button} from 'primereact/button';
import {useNavigate} from "react-router-dom";
import {selectIsAuthenticated, logout, selectAuthUser} from "../../store";
import {useDispatch, useSelector} from "react-redux";

const Navbar = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated)
    const authenticatedUser = useSelector(selectAuthUser)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getOptions = () => {
        if (isAuthenticated && authenticatedUser) {
            return [
                {
                    label: authenticatedUser.username,
                    icon: 'pi pi-fw pi-user',
                    items: [
                        {
                            label: 'Logout',
                            icon: 'pi pi-fw pi-user-plus',
                            command: () => {
                                dispatch(logout());
                                navigate('login');
                            }
                        }
                    ]
                }
            ];
        } else {
            return [
                {
                    label: 'Datasets',
                    icon: 'pi pi-fw pi-database',
                    command: () => {
                        navigate('/datasets');
                    }
                }
            ];
        }
    }

    const menuBarEnd = () => {
        return (
            isAuthenticated ? null :
            <div className='flex gap-1'>
                <Button label="Register" outlined icon="pi pi-user-plus" onClick={() => navigate('register')}/>
                <Button label="Login" icon="pi pi-user" onClick={() => navigate('login')}/>
            </div>
        )
    }

    const start = <Button label="Dataset E/T" severity="secondary" text onClick={() => navigate('/')}/>

    const styles = () => {
        if (isAuthenticated) {
            return {
                justifyContent: 'space-between'
            }
        }

        return {}
    }

    return (
        <div>
            <div className="card">
                <Menubar model={getOptions()} start={start} end={menuBarEnd()} style={styles()} />
            </div>
        </div>
    );
}

export default Navbar