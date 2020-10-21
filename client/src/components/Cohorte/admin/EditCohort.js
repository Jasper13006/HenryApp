import React, { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { editCohort } from '../../../redux/actions/cohorte'
import { purple } from '@material-ui/core/colors';
import { update } from '../../../redux/actions/update'

//imports de material UI
import { makeStyles, withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent'
import { DialogTitle, FormControl, TextField } from '@material-ui/core'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "200px",
        maxHeight: "600px",
        minWidth: "400px",
    },
    inputContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    rootInstructor: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "200px",
        minWidth: "500px",
    },
}))

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        '&:hover': {
            backgroundColor: purple[700],
        },
    },
}))(Button);

export default function EditCohort(data) {
    const dispatch = useDispatch()
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [cohort, setCohort] = useState({
        name: "",
        date: "",
        instructorId: data.data.instructorId
    })
    const handleClickOpen = () => {
            setOpen(true);
        };
        
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = (value) => () => {
        setCohort({...cohort,instructorId: value});
    };
    const handleChange = (e) => {
        setCohort({
            ...cohort,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit= async () => { 
        await dispatch(editCohort(data.data.id, cohort))
        handleClose()
        await dispatch(update())
    }
    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                <EditIcon/>
            </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <FormControl className={classes.inputContainer}>
                    <DialogTitle> Editar "{data.data.name}"</DialogTitle>
                    <DialogContent style={{display:"flex", flexDirection: "column", justifyContent: "center"}}>  
                        <div style={{display: "flex", justifyContent: "center"}}>
                            <TextField
                                label={data.data.name} 
                                variant="outlined"
                                name="name"
                                onChange={handleChange}
                            />
                            <TextField
                                label={data.data.date} 
                                variant="outlined"
                                name="date"
                                onChange={handleChange}
                            />
                        </div>
                        <List dense className={classes.rootInstructor}>
                            <div>
                                {data.instructores && data.instructores.map((instructor) => {
                                    const labelId = `checkbox-list-secondary-label-${instructor.name}`;
                                    return (
                                    <ListItem key={instructor.id}>
                                        <ListItemText id={labelId} primary={instructor.name + " " + instructor.lastName} />
                                        <ListItemSecondaryAction>
                                            <Checkbox
                                                edge="end"
                                                onChange={handleToggle(instructor.id)}
                                                checked={cohort.instructorId === instructor.id}
                                            />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    );
                                })}
                            </div>
                        </List>
                        <ColorButton variant="contained" color="primary" className={classes.margin} onClick={handleSubmit}>
                            Listo
                        </ColorButton>
                    </DialogContent>
                </FormControl>
            </Dialog>

        </div>
    )
}