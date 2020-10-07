import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './AppRouter.css';
import Panel from "../components/panel/panel.js";
import Home from '../pages/Home';
import Login from '../components/login/Login';
import Register from '../components/register/RegisterMain';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import Axios from 'axios';

const AppRouter = () => {

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fectData = async () => {
            const admin = { name: "Admin", lastName: "Admin", email: "admin@admin.com", password: "Henry1234", admin: true }
            const { data } = await Axios.post('http://localhost:3001/create-admin', admin)
            console.log(data)
        }
        fectData()
    }, [])

    return (
        <Router>
            <Switch>
                <PublicRoute exact path="/register/:token" component={Register} />
                <PublicRoute exact path="/login" isToken={token} component={Login} />
                <Route exact path="/" component={Home} />
                <PrivateRoute path="/panel" isToken={token} component={Panel} />
            </Switch>

        </Router>
    )
}

export default AppRouter;