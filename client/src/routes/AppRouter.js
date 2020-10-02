import React from 'react'
import { BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import './AppRouter.css'
import Panel from '../components/Panel/Panel.js'
import Perfil from '../components/Perfil/Perfil'
import Cohorte from '../components/Cohorte/Cohorte'
import PM from '../components/PM/PM'
import Pair_programming from '../components/Pair_programming/Pair_programming'
import Notas from '../components/Notas/Notas'

const AppRouter = () => {

    return (
        <Router>
            <Panel/>
        </Router>
    )
}

export default AppRouter;