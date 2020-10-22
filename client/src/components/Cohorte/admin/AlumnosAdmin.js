import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getStudents } from '../../../redux/actions/user'
import { migrarStudent } from '../../../redux/actions/student';
import imagenTriste from '../triste.png'

//imports de material UI
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import { Button, MenuItem, TableContainer } from '@material-ui/core';
import {Select} from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import Swal from 'sweetalert2'

const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        minWidth: "100%",
        marginTop:'20px',
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
    const dispatch = useDispatch();
    const classes = useStyles()
    const usuarios = useSelector(state => state.students.data)
    const [filter, setFilter] = useState("Todos")
    const refresh = useSelector(state => state.update)
    useEffect(()=> {
        dispatch(getStudents())
    }, [refresh])
    const handleFilter = (e) => {
        e.preventDefault();
        setFilter(e.target.value)
    }

    const handleDeleteStudente = async(alumno) => {
        const { value: cohId } = await Swal.fire({
                title: `Migracion de estudiante ${alumno.user.name}`,
                input: 'select',
                inputOptions: cohortes.data.map(coh => {
                    return [coh.id] =  coh.name
                }),
                inputPlaceholder: 'Cohortes',
                showCancelButton: true,
                inputValidator: (value) => {
                return new Promise((resolve) => {
                    if (value !== '') {
                    resolve()
                    } else {
                    resolve('Necesitas elegir el cohorte al que vas a migrar :)')
                    }
                })
            }
        })
        dispatch(migrarStudent(parseInt(cohId)+1, alumno.id))
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
                                                )): null
                                            }
                                        </TableBody>
                                </Table>
                                </TableContainer>
                                :
                                filter === "Por_cohorte" &&
                                <div>
                                    {cohortes.data && cohortes.data.length !== 0? cohortes.data.map((cohorte, index) => (
                                        filterStudents(usuarios, cohorte.id).length > 0 ?
                                        <div key={index} className={classes.cohortFilter}>
                                            <TableContainer component={Paper}>
                                            <Typography style={{display: "flex", justifyContent: "center"}} component="h2" variant="h6" color="primary" gutterBottom={true}>
                                                {cohorte.name}
                                            </Typography>
                                                <Table size="small">
                                                    <TableHead>
                                                        <TableRow >
                                                        <TableCell style={{minWidth: "150px", fontWeight: 'bold', fontSize: '16px'}}>Nombre</TableCell>
                                                        <TableCell style={{fontWeight: 'bold', fontSize: '16px'}}>Apellido</TableCell>
                                                        <TableCell style={{fontWeight: 'bold', fontSize: '16px'}}>Email</TableCell>
                                                        <TableCell style={{fontWeight: 'bold', fontSize: '16px'}}>PM</TableCell>
                                                        <TableCell style={{minWidth: "100px", fontWeight: 'bold', fontSize: '16px'}}>Registro</TableCell>
                                                        <TableCell style={{minWidth: "100px", fontWeight: 'bold', fontSize: '16px'}}>Migrar</TableCell>
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
                                                                    <TableCell style={{minWidth: "130px"}}>{<Button onClick={() => handleDeleteStudente(student)}><NewReleasesIcon/></Button>}</TableCell>
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