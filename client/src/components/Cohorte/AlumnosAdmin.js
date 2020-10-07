import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { traerUsuarios } from '../../redux/actions/user'


import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import imagenTriste from './triste.png'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center"
    }
}))


export default function CohorteAdmin(){
    const dispatch = useDispatch();
    const classes = useStyles()
    const usuarios = useSelector(state => state.usuarios.data)
    useEffect(()=> {
        dispatch(traerUsuarios())
    }, [])
    console.log(usuarios)
    return (
        <div className={classes.root}>
            <ul>
                {usuarios? usuarios.map(alumno => {
                    
                    return (
                        <TableRow  key={alumno.id}>
                        <TableCell >
                        Nombre: &nbsp;{alumno.name}    
                        </TableCell>
                        <TableCell >Apellido: &nbsp;{alumno.lastName}&nbsp;</TableCell>
                        <TableCell >Email: &nbsp;{alumno.email}&nbsp;</TableCell>
                        </TableRow>
                    )
                }): 
                    <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
                        <h3 style={{display: "flex", justifyContent: "center"}}>No hay alumnos de momento</h3>
                        <img src={imagenTriste}/>
                    </div>
                }
            </ul>
        </div>
    )
}
