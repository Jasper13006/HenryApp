import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Perfil from '../Perfil/Perfil'
import Cohorte from '../Cohorte/Cohorte'
import PM from '../PM/PMUser/PM'
import Pair_programming from '../Pair_programming/Pair_programming'
import Notas from '../Notas/Notas'
import Calificar from '../Notas/Calificar'
import Invitacion from '../invitacion/Invitacion'
import cohorteAdmin from '../Cohorte/admin/CohorteAdmin'
import Calendar from '../Calendar/Calendar'
import ToMsg from '../msg/ToMsg'
import Msg from '../msg/Msg'


const AppRouter = () => {

    return (
        <Switch>
            <Route exact path="/panel" component={Calendar} />
            <Route exact path="/panel/perfil" component={Perfil} />
            <Route exact path="/panel/cohorte" component={Cohorte} />
            <Route exact path="/panel/PM" component={PM} />
            <Route exact path="/panel/pair_programming" component={Pair_programming} />
            <Route exact path="/panel/notas" component={Notas} />
            <Route exact path="/panel/invitacion" component={Invitacion} />
            <Route exact path="/panel/mensaje_usuario" component={ToMsg} />
            <Route exact path="/panel/mensaje_directo" component={Msg} />
            <Route exact path="/panel/calificar" component={Calificar} />

        </Switch>
    )
}

export default AppRouter;