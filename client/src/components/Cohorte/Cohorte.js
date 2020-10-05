import React, { useState, useEffect } from 'react'
import store from '../../redux/store/index'
import { getCohorteUser } from '../../redux/actions/cohorte'
import { useSelector, useDispatch } from 'react-redux'
import './Cohorte.css'
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Compañeros from './Compañeros'



const useStyles = makeStyles((theme) => ({
        root: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        },
        paper: {
            width: "100%",
            padding: theme.spacing(2),
            textAlign: 'center',
            color: "#512990",
            fontSize: "30px",
            margin: theme.spacing(1),
            marginLeft: "1px",
            backgroundColor: "#2f84af",
        },
        paper2: {
            width: "50%",
            display: "flex",
            marginLeft: "25%",
            backgroundColor: "#c8c8c8",
            justifyContent: "center",
            color: "grey",
            padding: theme.spacing(2),
            margin: theme.spacing(1),
        },
        
}));

export default function Cohorte(){
    const classes = useStyles();
    const dispatch = useDispatch()
    const [option,setOption] = useState(0)
    const [cohorte, setCohorte] = useState(null)
    const menuOption=useSelector(state=>state.panel.data)
    
    
    useEffect(()=> {
        setOption(menuOption? menuOption: 0)
    }, [menuOption])
    useEffect(()=> {
        const id = localStorage.getItem("idUser")
        dispatch(getCohorteUser(id))
        store.subscribe(() => {
            setCohorte(() => store.getState().getCohorteUser.data)
            console.log(store.getState())
        })
    }, [])

    return (
        <div className={classes.root}>
        {option !== null? 
        option === 0 &&
            <div className={classes.root}>
                <Hidden only="sm">
                    <Paper className={classes.paper}>¤ {cohorte && cohorte.name} ¤</Paper>
                    <Paper className={classes.paper2}>Instructor: {cohorte && cohorte.instructor.name + " " + cohorte.instructor.lastName}</Paper>
                </Hidden>
                <div className="pizarron">
                    <h3 className="subtitulo">Clases Grabadas </h3>
                    <ul className="linksGenerales">
                        <li><a className="links" href="#">Clase1</a></li>
                        <li><a className="links" href="#">Clase2</a></li>
                        <li><a className="links" href="#">Clase3</a></li>
                        <li><a className="links" href="#">Clase4</a></li>
                        <li><a className="links" href="#">Clase5</a></li>
                        <li><a className="links" href="#">Clase6</a></li>
                        <li><a className="links" href="#">Clase7</a></li>
                        <li><a className="links" href="#">Clase8</a></li>
                        <li><a className="links" href="#">Clase9</a></li>
                        <li><a className="links" href="#">Clase10</a></li>
                        <li><a className="links" href="#">Clase11</a></li>
                        <li><a className="links" href="#">Clase12</a></li>
                        <li><a className="links" href="#">Clase13</a></li>
                        <li><a className="links" href="#">Clase14</a></li>
                        <li><a className="links" href="#">Clase15</a></li>
                        <li><a className="links" href="#">Clase16</a></li>
                        <li><a className="links" href="#">Clase17</a></li>
                        <li><a className="links" href="#">Clase18</a></li>
                        <li><a className="links" href="#">Clase19</a></li>
                        <li><a className="links" href="#">Clase20</a></li>
                        <li><a className="links" href="#">Clase21</a></li>
                        <li><a className="links" href="#">Clase22</a></li>
                        <li><a className="links" href="#">Clase23</a></li>
                        <li><a className="links" href="#">Clase24</a></li>
                        <li><a className="links" href="#">Clase25</a></li>
                        <li><a className="links" href="#">Clase26</a></li>
                    </ul>
                </div>
            </div> ||
        option === 1 && 
            <Compañeros cohorte={cohorte}/>
            : 
            null
        }
        </div>
        )
}