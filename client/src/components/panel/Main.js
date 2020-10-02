import React from 'react'
import { BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import Perfil from '../Perfil/Perfil'
import Cohorte from '../Cohorte/Cohorte'
import PM from '../PM/PM'
import Pair_programming from '../Pair_programming/Pair_programming'
import Notas from '../Notas/Notas'

const Home =()=>{
    return(
        <div>
            Home
        </div>
    )
}
const AppRouter = () => {

    return (
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/perfil" component={Perfil}/>
                <Route exact path="/cohorte" component={Cohorte}/>
                <Route exact path="/PM" component={PM}/>
                <Route exact path="/pair_programming" component={Pair_programming}/>
                <Route exact path="/notas" component={Notas}/>
            </Switch>
    )
}

export default AppRouter;