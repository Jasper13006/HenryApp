import React, { useState, useEffect } from 'react'
import store from '../../redux/store/index'
import { useDispatch, useSelector } from 'react-redux'
import { getAlumnosCohorte } from '../../redux/actions/cohorte'
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import imagenTriste from './triste.png'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
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


export default function Compañeros(cohorte){
    const classes = useStyles();
    const dispatch = useDispatch()
    const [compañeros, setCompañeros] = useState(null)
    console.log(cohorte.cohorte)

    useEffect(()=> {
        dispatch(getAlumnosCohorte(cohorte.cohorte.id))
        console.log(store.getState())
        store.subscribe(() => {
            setCompañeros(() => store.getState().getAlumnosCohorte.data)
        })
    }, [])

    return (
        <div>
                <Hidden only="sm">
                    <Paper className={classes.paper}>¤ {cohorte && cohorte.cohorte.name} ¤</Paper>
                    <Paper className={classes.paper2}>Instructor: {cohorte && cohorte.cohorte.instructor.name + " " + cohorte.cohorte.instructor.lastName}</Paper>
                </Hidden>
                <div>
                    <ul>
                        {compañeros? compañeros.map(alumno => {
                            return (<li>{alumno.user.name + " " + alumno.user.lastName + "    " + alumno.user.email}</li>)
                        }): 
                            <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
                                <h3 style={{display: "flex", justifyContent: "center"}}>No hay alumnos de momento</h3>
                                <img src={imagenTriste}/>
                            </div>
                        }
                    </ul>
                </div>
            </div>
    )
}