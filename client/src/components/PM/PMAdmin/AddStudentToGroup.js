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
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


export default function FormDialog({ id }) {
    const classes = useStyles()
    const dispatch = useDispatch();
    const allStudents = useSelector(state => state)
    const [open, setOpen] = React.useState(false);


    const [student, setStudent] = React.useState({
        userId: ""
    });



    useEffect(() => {
        getAlumnosCohorte(id)
    }, [])

    console.log(allStudents)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (id, e) => {
        e.preventDefault();
        console.log(e.target.value);
        dispatch(agregarEstudianteAGrupo(id, e))
    }

    const handleChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        })
    };

    return (
        <div>
            <DialogTitle id="form-dialog-title">Selecciona un estudiante</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email address here. We will send updates
                    occasionally.
          </DialogContentText>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        name={"userId"}
                        value={student}
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    <FormHelperText>Some important helper text</FormHelperText>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
          </Button>
                <Button onClick={handleClose} color="primary">
                    Subscribe
          </Button>
            </DialogActions>

        </div>
    );
}