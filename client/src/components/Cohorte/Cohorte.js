import React, { useEffect, useState } from 'react';
import { getCohorteUser, getLinkVideos } from '../../redux/actions/cohorte';
import { getStudent } from '../../redux/actions/user';
import { useSelector, useDispatch } from 'react-redux';
import Admin from './admin/Admin';
import './Cohorte.css';

//imports de material UI
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Compañeros from './Compañeros'
import Table from '@material-ui/core/Table';
import { TableCell, TableHead, TableRow } from '@material-ui/core';
import { Link } from 'react-router-dom'
import TableBody from '@material-ui/core/TableBody';
import { DialogTitle, MenuItem } from '@material-ui/core';


const imgTriste = require("./triste.png")


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
        paper3: {
            width: "100%",
            padding: theme.spacing(2),
            textAlign: 'center',
            color: "#512990",
            fontSize: "50px",
            margin: theme.spacing(1),
        },
        typographyTitle: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        },
        Link: {
            display: "flex", 
            margin: "30px",
            justifyContent: "center",
            borderRadius: "15px",
            alignItems: "center",
            color: "black",
            width: "150px", 
            height: "70px",
            background: "radial-gradient(circle, rgba(203,203,203,1) 0%, rgba(233,223,148,0.37718837535014005) 100%)"

        }
}));

const filterModulos = (array, parametro) => {
    const filtro = array.filter(mod => mod.name === parametro)
    return filtro;
}

export default function Cohorte(){
    const classes = useStyles();
    const dispatch = useDispatch()
    const moduleType= ['1 - JS Foundations', '2 - Frontend', '3 - Backend', '4 - Base de datos', '5 - Henrylabs']
    const [dispatchActivo, setDispatchActivo] = useState(false)
    const option = useSelector(state=>state.panel.data)
    const cohorte = useSelector(state => state.getCohorteUser.data)
    const modulos = useSelector(state => state.modulos.data)
    const student = useSelector(state => state.student.data)
    const user = JSON.parse(localStorage.getItem("user"))
    const id = parseInt(localStorage.getItem("idUser"))
    useEffect(()=> {
        if(!user.admin){
            dispatch(getStudent(id))
            dispatch(getLinkVideos(id))
        }    
    }, [])

    //Me aseguro que se ejecute el dispatch despues de haber traido al estudiante, para poder usar su informacion, y ya desactivo esa opcion
    if(student && !dispatchActivo){
        dispatch(getCohorteUser(student[0].cohorteId))
        setDispatchActivo(true)
    }
    return (
        <div className={classes.root}>
        {
        user.admin?
            <Admin/>    
        :
        cohorte && cohorte.instructor ?
        !option?
            <div>
                <Hidden only="sm">
                    <Paper className={classes.paper}>{cohorte && cohorte.name}</Paper>
                    <Paper className={classes.paper2}>Instructor: {cohorte && cohorte.instructor.name + " " + cohorte.instructor.lastName}</Paper>
                </Hidden>
                <h3 className="subtitulo">Clases Grabadas </h3>
                <Table size="medium">
                    <TableBody>
                        {modulos && moduleType.map(name => (
                            filterModulos(modulos, name).length > 0?
                            <TableRow style={{display: "flex", alignItems: "center", flexDirection: "column", flexWrap: "wrap"}}>
                                <DialogTitle style={{display: "flex", justifyContent: "center", borderRadius: "30px",  background: "radial-gradient(circle, rgba(255,251,251,1) 0%, rgba(255,242,147,1) 100%)"}}>{name.slice(3, name.length)}</DialogTitle>
                                <div style={{display: "flex",maxWidth: "1000px", flexWrap: "wrap"}}>
                                {filterModulos(modulos, name).map((module, i) => (
                                    <TableCell key={i}>
                                        <Link
                                            className={classes.Link}
                                            onClick={() => {
                                                window.open(module.linkVideos)
                                            }}
                                        >
                                            {module.nameClass}
                                        </Link>
                                    </TableCell>
                                ))}
                                </div>
                            </TableRow>
                            :null
                        ))}
                    </TableBody>
                </Table>
            </div> :
        option === 1 && 
            <Compañeros cohorte={cohorte? cohorte : null}/>
            :
            <div className={classes.typographyTitle}>
                <Typography  variant="h3" component="h2" gutterBottom>
                    No perteneces a ningun cohorte de momento
                </Typography>
                <img src={imgTriste}/>
            </div>
        }
        </div>
        )
}