import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './AppRouter.css'
import Panel from "../components/panel/panel.js";
import Home from '../pages/Home'
import Login from '../components/login/Login'
import Register from '../components/register/RegisterMain'
const AppRouter = () => {

    return (
        <Router>
            <Switch>
                <Route exact path="/Register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/" component={Home} />
                <Route path="/panel" component={Panel} />
            </Switch>

        </Router>
    )
}

export default AppRouter;