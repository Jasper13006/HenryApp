import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStudents } from '../../../redux/actions/user'
import imagenTriste from '../triste.png'

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import { DialogTitle, MenuItem } from '@material-ui/core';
import {Select} from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';


const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        minWidth: "100%"
    },
    filter:{
        order:1,
        marginLeft:"auto",
    },
    toolbar:{
        display:"flex",
    },
    container:{
        display:"flex",
        width:"30%",
    },
    tableCell: {
        borderRaduis:"50px",
        background: "linear-gradient(180deg, rgba(38,38,255,1) 0%, rgba(0,212,255,1) 77%)"
    },
    title: {
        display: "flex",
        borderRadius: "50px",
        backgroundColor: "black",
        color: "white",
    },
    cohortTitle: {
        display: "flex",
        justifyContent: "center",
        background: "rgb(160,160,253)",
        background: "radial-gradient(circle, rgba(160,160,253,1) 39%, rgba(251,251,251,1) 100%)",
    },
    cohortFilter: {
        marginBottom: "40px",
    }
}))

const filterStudents = (array, cohorteId) => {
    const filtro = array.filter(estudiante => estudiante.cohorteId === cohorteId)
    return filtro;
}


export default function AlumnosAdmin(cohortes){
    console.log(cohortes)
    const dispatch = useDispatch();
    const classes = useStyles()
    const usuarios = useSelector(state => state.students.data)
    const [filter, setFilter] = useState("Todos")
    useEffect(()=> {
        dispatch(getStudents())
    }, [])
    const handleFilter = (e) => {
        e.preventDefault();
        setFilter(e.target.value)
    }
    return (
        <div className={classes.root}>
            <Fab color="black">
                <DialogTitle className={classes.title}>Estudiantes</DialogTitle>
            </Fab>
            <Toolbar className={classes.toolbar}>
                <div className={classes.container}>
                    <ul>
                        <div>
                            <Select
                                id="filtrar"
                                onChange={handleFilter}
                                value={filter}
                                className={classes.filter}
                            >
                                <MenuItem value="Todos">Todos</MenuItem>  
                                <MenuItem value="Por_cohorte">Por cohorte</MenuItem>
                            </Select>
                        </div>
                            {!filter || filter === "Todos"?
                                <Table size="medium">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Nombre</TableCell>
                                                <TableCell>Apellido</TableCell>
                                                <TableCell>Email</TableCell>
                                                <TableCell>PM</TableCell>
                                                <TableCell style={{minWidth: "100px"}}>registro</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {usuarios? usuarios.map(alumno => (
                                                <TableRow key={alumno.id} className={classes.tableCell} hover={true}>
                                                    <TableCell>{alumno.user.name}</TableCell>
                                                    <TableCell>{alumno.user.lastName}</TableCell>
                                                    <TableCell style={{minWidth: "350px", maxWidth: "350px"}}>{alumno.user.email}</TableCell>
                                                    <TableCell>{alumno.user.pm? "Si": "No"}</TableCell>
                                                    <TableCell style={{minWidth: "150px"}}>{alumno.user.createdAt.split('T')[0]}</TableCell>
                                                </TableRow>
                                                )): 
                                                <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
                                                    <h3 style={{display: "flex", justifyContent: "center"}}>No hay alumnos de momento</h3>
                                                    <img src={imagenTriste}/>
                                                </div>
                                            }
                                        </TableBody>
                                </Table>
                                :
                                filter === "Por_cohorte" &&
                                <div>
                                    <Table size="medium">
                                        {cohortes.data && cohortes.data.length !== 0? cohortes.data.map(cohorte => (
                                        filterStudents(usuarios, cohorte.id).length > 0 ?
                                        <div className={classes.cohortFilter}>
                                            <DialogTitle className={classes.cohortTitle}>{cohorte.name}</DialogTitle>
                                            <TableHead>
                                                <TableRow style={{border: "black 2px solid"}} >
                                                    <TableCell>Nombre</TableCell>
                                                    <TableCell>Apellido</TableCell>
                                                    <TableCell style={{minWidth: "350px", maxWidth: "350px"}}>Email</TableCell>
                                                    <TableCell>PM</TableCell>
                                                    <TableCell style={{width: "100px"}}>registro</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    filterStudents(usuarios, cohorte.id).map(student => (
                                                        student.length !== 0?
                                                        <TableRow key={cohorte.id} className={classes.tableCell} hover={true}>
                                                            <TableCell style={{minWidth: "100px"}}>{student.user.name}</TableCell>
                                                            <TableCell style={{minWidth: "100px"}}>{student.user.lastName}</TableCell>
                                                            <TableCell style={{minWidth: "100px"}}>{student.user.email}</TableCell>
                                                            <TableCell style={{minWidth: "100px"}}>{student.pm? "Si": "No"}</TableCell>
                                                            <TableCell style={{minWidth: "150px"}}>{student.createdAt.split('T')[0]}</TableCell>
                                                        </TableRow>: null
                                                    ))
                                                }
                                            </TableBody>
                                        </div>: null
                                        )):
                                            <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
                                                <h3 style={{display: "flex", justifyContent: "center"}}>No hay alumnos de momento</h3>
                                                <img src={imagenTriste}/>
                                            </div>
                                        }
                                    </Table>
                                </div>
                            }
                    </ul>
                </div>
            </Toolbar>
        </div>
    )
}