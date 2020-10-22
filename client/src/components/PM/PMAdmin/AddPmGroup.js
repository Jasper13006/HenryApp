import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { agregarGrupoPm } from '../../../redux/actions/pm';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios'
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { update } from '../../../redux/actions/update'
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}



const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


export default function FormDialog({ cohorteId, handleCloseAll, openGeneral }) {

    // const pms = useSelector(state => state.pm)
    const classes = useStyles();
    const dispatch = useDispatch()
    const [openAlert, setOpenAlert] = useState(false);
    const [open, setOpen] = useState(false)
    const [pms, setPms] = useState()
    const [pm, setPm] = useState();
    const [state, setState] = useState({
        name: "",
        PM1Id: "",
        PM2Id: "",
        cohorteId: cohorteId,
        submitted: false
    })

    const getPm = () => {
        axios.get(`http://localhost:3001/user/pms`)
            .then((res) => {
                setPms(res.data)
            }).catch(err => console.log(err))
    }

    useEffect(() => {
        getPm()
    }, [])

    const handleClickAlert = () => {
        setOpenAlert(true);
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);

    }

    const success = () => {
        return (
            <Snackbar open={true} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="success">
                    Se agregó el grupo correctamente
            </Alert>
            </Snackbar>
        )
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleInputChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
        console.log(state)


    }




    const handleSubmit = (e) => {
        console.log(e.target.value);
        dispatch(agregarGrupoPm(state))
        handleCloseAll()

    }


    return (
        <div>
            <Button onClick={handleOpen} style={{ color: "black", backgroundColor: "yellow", }} aria-label="add" >
                <h2 style={{ fontSize: "30px" }}>+</h2>
            </Button>
            {open && <form onSubmit={handleSubmit}>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Agregar un grupo de PM</DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            Por favor, llene todos los campos para poder crear un nuevo grupo de PM.
          </DialogContentText>
                        <TextField
                            onChange={handleInputChange}
                            autoFocus
                            name="name"
                            margin="dense"
                            type="text"
                            id="name"
                            label="Nombre del grupo"
                            type="email"
                            fullWidth
                        />



                        <FormControl className={classes.formControl} onChange={handleInputChange}>
                            <InputLabel id="demo-simple-select-label">PM1</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="PM1Id"
                                name="PM1Id"
                                value={pm}
                                onChange={handleInputChange}
                            >
                                {pms && pms.map((pm) => (<MenuItem key={pm.id} value={pm.id}>{pm.name}</MenuItem>
                                ))}

                            </Select>
                        </FormControl>

                        <FormControl className={classes.formControl} onChange={handleInputChange}>
                            <InputLabel id="demo-simple-select-label">PM2</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="PM2Id"
                                name="PM2Id"
                                value={pm}
                                onChange={handleInputChange}
                            >
                                {pms && pms.map((pm) => (<MenuItem key={pm.id} value={pm.id}>{pm.name}</MenuItem>
                                ))}

                            </Select>
                        </FormControl>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancelar
          </Button>
                        <Button type="submit" onClick={handleSubmit} color="primary">
                            Crear grupo
          </Button>
                    </DialogActions>

                </Dialog>
            </form >}
        </div>
    );
}