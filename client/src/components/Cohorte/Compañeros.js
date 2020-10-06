import React, { useState, useEffect } from 'react'
import store from '../../redux/store/index'
import { useDispatch, useSelector } from 'react-redux'
import { getAlumnosCohorte } from '../../redux/actions/cohorte'
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import imagenTriste from './triste.png'
import { makeStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2'
//imports de material UI
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';




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
    table: {
        minWidth: 650,
        display: "flex",
        justifyContent: "center",
        
    },
}));


export default function Compañeros(cohorte){
    const classes = useStyles();
    const dispatch = useDispatch()
    const compañeros = useSelector(state => state.getAlumnosCohorte.data)
    console.log(compañeros)
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
        // console.log(store.getState())
        
    }, [])

    return (
        <TableContainer component={Paper}>
            <Hidden only="sm">
                <Paper className={classes.paper}>¤ {cohorte && cohorte.cohorte.name} ¤</Paper>
                <Paper className={classes.paper2}>Instructor: {cohorte && cohorte.cohorte.instructor.name + " " + cohorte.cohorte.instructor.lastName}</Paper>
            </Hidden>
            <Table className={classes.table} aria-label="simple table">
                <div>
                    <ul>
                        {compañeros? compañeros.map(alumno => {
                            return (
                                <TableRow key={alumno.id}>
                                <TableCell >
                                Nombre: &nbsp;{alumno.user.name}    
                                </TableCell>
                                <TableCell >Apellido: &nbsp;{alumno.user.lastName}&nbsp;</TableCell>
                                <TableCell >Email: &nbsp;{alumno.user.email}&nbsp;</TableCell>
                                <TableCell >Estado: &nbsp;{alumno.estado}&nbsp;</TableCell>

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
            </Table>
      </TableContainer>
    )
}

                            {/* <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                            </TableRow> */}
// export default function BasicTable() {
//     const classes = useStyles();
  
//     return (
//       <TableContainer component={Paper}>
//         <Table className={classes.table} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell>Dessert (100g serving)</TableCell>
//               <TableCell align="right">Calories</TableCell>
//               <TableCell align="right">Fat&nbsp;(g)</TableCell>
//               <TableCell align="right">Carbs&nbsp;(g)</TableCell>
//               <TableCell align="right">Protein&nbsp;(g)</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.map((row) => (
//               <TableRow key={row.name}>
//                 <TableCell component="th" scope="row">
//                   {row.name}
//                 </TableCell>
//                 <TableCell align="right">{row.calories}</TableCell>
//                 <TableCell align="right">{row.fat}</TableCell>
//                 <TableCell align="right">{row.carbs}</TableCell>
//                 <TableCell align="right">{row.protein}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     );
//   }