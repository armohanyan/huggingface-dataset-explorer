import './App.css'
import {Routes, Route,  Outlet, Navigate} from 'react-router-dom';
import Alert from './components/alert/alert.tsx';
import HomeView from './views/home/Home.tsx';
import Navbar from "./components/navbar/navbar.tsx";
import LoginView from './views/login/Login';
import RegisterView from "./views/register/Register.tsx";
import {useSelector} from "react-redux";
import {selectIsAuthenticated} from "./store";
import DatasetsView from "./views/datasets/Datasets.tsx";
import DatasetView from "./views/dataset/Dataset.tsx";
import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

function App() {
    const isAuthenticated = useSelector(selectIsAuthenticated)

    const PrivateRoute = () => {
        return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
    };

    return (
        <div>
            <Navbar/>

            <Alert/>

            <Routes>
                <Route path="/" element={<PrivateRoute />}>
                    <Route path="/" element={<HomeView />} />
                </Route>
                <Route path="/" element={<PrivateRoute />}>
                    <Route path="/dataset" element={<DatasetView />} />
                </Route>

                <Route path="/login" element={<LoginView/>}/>
                <Route path="/register" element={<RegisterView/>}/>
                <Route path="/datasets" element={<DatasetsView/>}/>
            </Routes>
        </div>
    )
}

export default App
