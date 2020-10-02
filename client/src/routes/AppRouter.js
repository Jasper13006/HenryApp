import React from 'react'
import { BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import './AppRouter.css'
import Panel from '../components/panel/Panel.js'
import Home from '../pages/Home'

const AppRouter = () => {

    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/panel" component={Panel}/>
            </Switch>
            
        </Router>
    )
}

export default AppRouter;