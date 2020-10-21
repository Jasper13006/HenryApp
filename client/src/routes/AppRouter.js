import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './AppRouter.css';
import Panel from "../components/panel/Panel";
import Home from '../pages/Home';
import Login from '../components/login/MainLogin';
import Register from '../components/register/RegisterMain';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import axios from 'axios';
import ForgetPass from '../components/login/ForgetPass';
import ResetPass from '../components/login/ResetPass'
import socket from '../components/msg/Socket';


const AppRouter = () => {

    const token = localStorage.getItem("token")

    useEffect(() => {
        socket.emit('conectado','hola desde cliente')
        if(!token){
            const fectData = async () => {
                const admin = { name: "Admin", lastName: "Admin", email: "admin@admin.com", password: "Henry1234", admin: true }
                const { data } = await axios.post('http://localhost:3001/create-admin', admin)
                console.log(data)
            }
            fectData()
        }
        
    }, [])

    return (
        <Router>
            <Switch>
                <PublicRoute exact path="/register/:token" component={Register} />
                <PublicRoute exact path="/login" isToken={token} component={Login} />
                <Route exact path="/" component={Home} />
                <Route exact path="/olvidemicontraseña" component={ForgetPass} />
                <Route exact path="/user/resetpassword/:token" component={ResetPass} />            
                <Route path="/panel" isToken={token} component={Panel} />
            </Switch>

        </Router>
    )
}

export default AppRouter;