import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { createCohort } from '../../../redux/actions/cohorte'
import { update } from '../../../redux/actions/update'

//imports de material UI
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent'
import { DialogTitle, FormControl, TextField } from '@material-ui/core'
import Fab from '@material-ui/core/Fab';
import { getInstructors } from '../../../redux/actions/user';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { purple } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "200px",
        maxHeight: "600px",
        minWidth: "400px",
    },
    rootInstructor: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "200px",
        minWidth: "500px",
    },
    dialog: {
        display:'flex',
        justifyContent: "center",
        alignItems: "center",
    },
    formControl: {
        display: "center",
        justifyContent: "center",
        alignItems: "center",
        width: "500px",
        height: "400px",
        color: "black"
    },
    addIcon: {
        display: "flex",
        width: "50px",
        height: "50px",
        borderRadius: "50px",
        backgroundColor: "black",
        color: "white",

    }
}));

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        '&:hover': {
            backgroundColor: purple[700],
        },
    },
}))(Button);



export default function AddOneCohorte(){
    const dispatch = useDispatch()  
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const instructors = useSelector(state => state.instructors.data)
    const [cohorte, setCohorte] = useState({
        "name": "",
        "date": "",
        "instructorId": ""
    })
    useEffect(() => {
        dispatch(getInstructors())
    }, [])

    const handleToggle = (value) => () => {
        setCohorte({...cohorte,instructorId: value});
    };
    

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    
    const handleChange = (e) => {
        setCohorte({
            ...cohorte,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        await dispatch(createCohort(cohorte))
        handleClose()
        await dispatch(update())
    }
    return (
        <div>
            <Fab onClick={handleClickOpen} color="black" className={classes.addIcon}>
                <AddIcon/>
            </Fab>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" className={classes.root}>
                <FormControl>
                    <DialogContent style={{display:"flex", flexDirection: "column", justifyContent: "center"}}>    
                        <DialogTitle style={{display: "flex", justifyContent: "center"}}>Agregar un cohorte nuevo</DialogTitle>
                            <div style={{display: "flex", justifyContent: "center"}}>
                                <TextField
                                    label="Nombre del cohorte" 
                                    variant="outlined"
                                    name="name"
                                    onChange={handleChange}
                                    />
                                <TextField
                                    label="Fecha de inicio"
                                    variant="outlined"
                                    name="date"
                                    onChange={handleChange}
                                />
                            </div>
                        <List dense className={classes.rootInstructor}>
                        <DialogTitle>¿Quien sera el Instructor?</DialogTitle>
                            <div>
                                {instructors && instructors.map((instructor) => {
                                    const labelId = `checkbox-list-secondary-label-${instructor}`;
                                    return (
                                    <ListItem key={instructor.id} button>
                                        <ListItemText id={labelId} primary={instructor.name + " " + instructor.lastName} />
                                        &nbsp;
                                        <ListItemSecondaryAction>
                                        &nbsp;
                                        <Checkbox
                                            edge="end"
                                            onChange={handleToggle(instructor.id)}
                                            checked={cohorte.instructorId === instructor.id}
                                        />
                                        &nbsp;
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    );
                                })}
                            </div>
                        </List>
                        <ColorButton variant="contained" color="primary" className={classes.margin} onClick={handleSubmit}>
                            Agregar
                        </ColorButton>
                    </DialogContent>
                </FormControl>
            </Dialog>
        </div>
    )
}