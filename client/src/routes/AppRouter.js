import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {useSelector} from 'react-redux'
import './AppRouter.css';
import Panel from "../components/panel/Panel.js";
import Home from '../pages/Home';
import Login from '../components/login/MainLogin';
import Register from '../components/register/RegisterMain';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import Axios from 'axios';

const AppRouter = () => {

    const token = localStorage.getItem("token")

    useEffect(() => {
        const fectData = async () => {
            const { data } = await Axios.get('http://localhost:3001/create-admin')
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
                <Route path="/panel" isToken={token} component={Panel} />
            </Switch>

        </Router>
    )
}

export default AppRouter;