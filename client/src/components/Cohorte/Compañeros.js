import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAlumnosCohorte } from '../../redux/actions/cohorte'
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import imagenTriste from './triste.png'
import { makeStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2'
//imports de material UI
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { DialogTitle, MenuItem } from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';



const useStyles = makeStyles((theme) => ({
    paper: {
        width: "100%",
        padding: theme.spacing(2),
        textAlign: 'center',
        color: "#512990",
        fontSize: "50px",
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
    table: {
        minWidth: 650,
        display: "flex",
        justifyContent: "center",
        
    },
    tableCell: {
        borderRaduis:"50px",
        background: "linear-gradient(180deg, rgba(38,38,255,1) 0%, rgba(0,212,255,1) 77%)"
    }
}));


export default function Compañeros(cohorte){
    const classes = useStyles();
    const dispatch = useDispatch()
    const compañeros = useSelector(state => state.getAlumnosCohorte.data)
    useEffect(() => {
        if(!cohorte){
            Swal.fire({
                icon: 'error',
                title: 'no perteneces a ningun Cohorte',
                showConfirmButton: false,
                timer: 1500
            })
            window.location.assign("/panel")
            return 
        }
    })
    useEffect(()=> {
        dispatch(getAlumnosCohorte(cohorte.cohorte.id))        
    }, [])
    compañeros && console.log(compañeros)
    return (
        <TableContainer component={Paper}>
            <Hidden only="sm">
                <Paper className={classes.paper}>{cohorte && cohorte.cohorte.name}</Paper>
                <Paper className={classes.paper2}>Instructor: {cohorte && cohorte.cohorte.instructor.name + " " + cohorte.cohorte.instructor.lastName}</Paper>
            </Hidden>
            <Table className={classes.table} aria-label="simple table">
            <div className={classes.cohortFilter}>
                <DialogTitle className={classes.cohortTitle}>{cohorte.name}</DialogTitle>
                <TableHead>
                    <TableRow style={{border: "black 2px solid"}} >
                        <TableCell>Nombre</TableCell>
                        <TableCell>|</TableCell>
                        <TableCell>Apellido</TableCell>
                        <TableCell>|</TableCell>
                        <TableCell style={{minWidth: "350px", maxWidth: "350px"}}>Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        compañeros && compañeros.map(compañero => (
                            <TableRow key={cohorte.id} className={classes.tableCell} hover={true}>
                                <TableCell style={{minWidth: "250px"}}>{compañero.user.name}</TableCell>
                                <TableCell>|</TableCell>
                                <TableCell style={{minWidth: "250px"}}>{compañero.user.lastName}</TableCell>
                                <TableCell>|</TableCell>
                                <TableCell style={{minWidth: "250px"}}>{compañero.user.email}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </div>
            </Table>
      </TableContainer>
    )
}