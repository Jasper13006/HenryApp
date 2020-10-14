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
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from "axios";
import { agregarEstudianteAGrupo, traerAlumnosPorGrupo } from '../../../redux/actions/student'
import { getAlumnosCohorte } from '../../../redux/actions/cohorte'


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 350,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


export default function FormDialog({ id, cohorteId, handleClose }) {
    const classes = useStyles()
    const dispatch = useDispatch();
    const allStudents = useSelector(state => state.getAlumnosCohorte.data)
    const [open, setOpen] = React.useState(false);
    const [state, setState] = useState({
        userId: "",
        grouppmId: id
    })
    const [student, setStudent] = React.useState();





    useEffect(() => {
        dispatch(getAlumnosCohorte(cohorteId))
    }, [])




    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        dispatch(agregarEstudianteAGrupo(cohorteId, state))
        handleClose()
    }

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    };

    return (
        <form onSubmit={handleSubmit}>
            <DialogTitle id="form-dialog-title">Selecciona un estudiante</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Selecciona un estudiante para agregarlo al grupo
          </DialogContentText>
                <FormControl className={classes.formControl} onChange={handleChange}>
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
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancelar
          </Button>
                <Button onClick={handleSubmit} color="primary">
                    Agregar
          </Button>
            </DialogActions>

        </form>
    );
}