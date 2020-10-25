import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import ListItemText from '@material-ui/core/ListItemText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import axios from "axios";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { IconButton } from '@material-ui/core'
import Input from '@material-ui/core/Input';
import { agregarEstudianteAGrupo, traerAlumnosPorGrupo } from '../../../redux/actions/student'
import { getAlumnosCohorte } from '../../../redux/actions/cohorte'
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Swal from 'sweetalert2';



const useStyles = makeStyles((theme) => ({
    listItem: {
        margin: "auto"
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 350,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


export default function FormDialog({ id, cohorteId, handleCloseGeneral, openGeneral }) {
    const classes = useStyles()
    const dispatch = useDispatch();
    const allStudents = useSelector(state => state.getAlumnosCohorte.data)
    const [open, setOpen] = useState(false);
    const studentsByGroup = useSelector(state => state.student.data)
    const [students, setStudents] = useState([]);

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };


    useEffect(() => {
        dispatch(getAlumnosCohorte(cohorteId))
        dispatch(traerAlumnosPorGrupo(id))
    }, [])



    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }



    const handleSubmit = (e) => {
        e.preventDefault();
        for (var i = 0; i < students.length; i++) {
            dispatch(agregarEstudianteAGrupo(cohorteId, {
                userId: students[i],
                grouppmId: id
            }))

        }
        handleCloseGeneral()
        Swal.fire({
            icon: 'success',
            title: 'Se ha agregado uno o varios henry/s',
        })
    }


    const handleChange = (e) => {
        setStudents({
            ...students,
            [e.target.name]: e.target.value
        })
    };

    const handleToggle = (id) => {
        if (students.includes(id)) {
            setStudents(students.filter(function (idStudent) { return idStudent !== id }))
        } else {
            setStudents([...students, id])
        }
    };

    const studentsFiltered = () => {
        return allStudents.filter((student) => !studentsByGroup.includes(student))
    }



    return (
        <div>
            <IconButton title={"Agregar estudiantes al grupo"} onClick={handleOpen}>
                <PersonAddIcon style={{ fontSize: "37px" }} />
            </IconButton>

            {open && <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={handleSubmit}>
                    <DialogTitle id="form-dialog-title" style={{ textAlign: "center", backgroundColor: "yellow", color: "black", fontWeight: "bolder" }}>Agregar estudiantes</DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{ textAlign: "center" }}>
                            Selecciona estudiantes para agregarlos al grupo
          </DialogContentText>
                        <FormControl className={classes.formControl}>

                            {allStudents && allStudents.filter((e) => e.grouppmId === null).map((student) => (
                                <ListItem className={classes.listItem} >
                                    <ListItemText primary={student.user.name + " " + student.user.lastName} />

                                    <Checkbox checked={students && students.includes(student.userId)} onChange={() => handleToggle(student.userId)} />

                                </ListItem>
                            ))

                            }


                        </FormControl>
                        {/* <FormControl className={classes.formControl} onChange={handleChange}>
                            <InputLabel id="demo-simple-select-helper-label">Estudiante</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="userId"
                                name="userId"
                                value={student}
                                onChange={handleChange}
                            >
                                {allStudents && allStudents.map((student) => (<MenuItem value={student.userId}>{student && student.user.name + " " + student.user.lastName}</MenuItem>))}

                            </Select>
                            <FormHelperText>Selecciona la persona que deseas agregar</FormHelperText>
                        </FormControl> */}
                    </DialogContent>
                    <DialogActions style={{ position: "flex", justifyContent: "space-between" }}>

                        <Button onClick={handleClose} color="primary" >
                            <h3>Cancelar</h3>
                        </Button>
                        <Button onClick={handleSubmit} color="primary" >
                            <h3>Agregar</h3>
                        </Button>
                    </DialogActions>
                </form>
            </Dialog >}
        </div>
    );
}