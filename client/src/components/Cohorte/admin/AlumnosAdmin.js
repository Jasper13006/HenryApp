import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStudents } from '../../../redux/actions/user'
import imagenTriste from '../triste.png'
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import { DialogTitle, MenuItem, TableContainer } from '@material-ui/core';
import {Select} from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


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
        // background: "linear-gradient(180deg, rgba(38,38,255,1) 0%, rgba(0,212,255,1) 77%)"
    },
    title: {
        display: "flex",
        borderRadius: "50px",
        backgroundColor: "black",
        color: "white",
    },
    cohortTitle: {
        display: "flex",
        justifyContent: "left",
        // background: "rgb(160,160,253)",
        // background: "radial-gradient(circle, rgba(160,160,253,1) 39%, rgba(251,251,251,1) 100%)",
        marginTop: '10px'
    },
    cohortFilter: {
        marginBottom: "40px",
        marginLeft: '10px'
    },
    separadorTables: {
        marginBottom: '100px',
        marginTop: '100px'
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
            <Typography component="h2" variant="h5" color="initial">
                Estudiantes
            </Typography>
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
                            <TableContainer component={Paper}>
                                <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={{minWidth: "150px", fontWeight: 'bold', fontSize: '16px'}}>Nombre</TableCell>
                                                <TableCell style={{fontWeight: 'bold', fontSize: '16px'}}>Apellido</TableCell>
                                                <TableCell style={{fontWeight: 'bold', fontSize: '16px'}}>Email</TableCell>
                                                <TableCell style={{fontWeight: 'bold', fontSize: '16px'}}>PM</TableCell>
                                                <TableCell style={{minWidth: "100px", fontWeight: 'bold', fontSize: '16px'}}>Registro</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {usuarios? usuarios.map(alumno => (
                                                <TableRow key={alumno.id} className={classes.tableCell} hover={true}>
                                                    <TableCell>{alumno.user.name}</TableCell>
                                                    <TableCell>{alumno.user.lastName}</TableCell>
                                                    <TableCell style={{minWidth: "350px", maxWidth: "350px"}}>{alumno.user.email}</TableCell>
                                                    <TableCell>{alumno.user.pm? "Si": "No"}</TableCell>
                                                    <TableCell style={{minWidth: "130px"}}>{alumno.user.createdAt.split('T')[0]}</TableCell>
                                                </TableRow>
                                                )): 
                                                <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
                                                    <h3 style={{display: "flex", justifyContent: "center"}}>No hay alumnos de momento</h3>
                                                    <img src={imagenTriste}/>
                                                </div>
                                            }
                                        </TableBody>
                                </Table>
                                </TableContainer>
                                :
                                filter === "Por_cohorte" &&
                                <div>
                                        {cohortes.data && cohortes.data.length !== 0? cohortes.data.map(cohorte => (
                                        filterStudents(usuarios, cohorte.id).length > 0 ?
                                        <div className={classes.cohortFilter}>
                                            <div className={classes.cohortTitle}>
                                            <Typography component="h2" variant="h6" color="primary" gutterBottom={true}>
                                                {cohorte.name}
                                            </Typography>
                                            </div>
                                            {/* <DialogTitle className={classes.cohortTitle}>{cohorte.name}</DialogTitle> */}
                                    <TableContainer component={Paper}>
                                    <Table size="small">
                                            <TableHead>
                                                <TableRow >
                                                <TableCell style={{minWidth: "150px", fontWeight: 'bold', fontSize: '16px'}}>Nombre</TableCell>
                                                <TableCell style={{fontWeight: 'bold', fontSize: '16px'}}>Apellido</TableCell>
                                                <TableCell style={{fontWeight: 'bold', fontSize: '16px'}}>Email</TableCell>
                                                <TableCell style={{fontWeight: 'bold', fontSize: '16px'}}>PM</TableCell>
                                                <TableCell style={{minWidth: "100px", fontWeight: 'bold', fontSize: '16px'}}>Registro</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    filterStudents(usuarios, cohorte.id).map(student => (
                                                        student.length !== 0?
                                                        <TableRow key={cohorte.id} className={classes.tableCell} hover={true}>
                                                            <TableCell>{student.user.name}</TableCell>
                                                            <TableCell>{student.user.lastName}</TableCell>
                                                            <TableCell style={{minWidth: "350px", maxWidth: "350px"}}>{student.user.email}</TableCell>
                                                            <TableCell>{student.user.pm? "Si": "No"}</TableCell>
                                                            <TableCell style={{minWidth: "130px"}}>{student.user.createdAt.split('T')[0]}</TableCell>
                                                        </TableRow>: null
                                                    ))
                                                }
                                            </TableBody>
                                            </Table>
                                            </TableContainer>
                                        </div>: null
                                        )):
                                            <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
                                                <h3 style={{display: "flex", justifyContent: "center"}}>No hay alumnos de momento</h3>
                                                <img src={imagenTriste}/>
                                            </div>
                                        }
                                </div>
                            }
                    </ul>
                </div>
            </Toolbar>
        </div>
    )
}