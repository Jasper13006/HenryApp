import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { traerUsuarios } from '../../../redux/actions/user'
import { addUserToACohort } from '../../../redux/actions/cohorte'
import { update } from '../../../redux/actions/update'

//imports de material UI
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { IconButton } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { DialogTitle, FormControl } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { purple } from '@material-ui/core/colors';
import Swal from 'sweetalert2';

const useStyles = makeStyles(() => ({
    dialog: {
        minWidth: "500px"
    },
    listItem: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",

        

    },
    inputContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    nameTitle: {
        display: "flex",
        width: "500px", 
        justifyContent: "center",
        borderRadius: "50px",
        background: "rgb(0,0,0)",
        color: "white",
    }
}))

const ColorButton = withStyles(() => ({
    root: {
        color: purple[700],
        margin: "black 1px solid",
        backgroundColor: "#f1ff29",
        '&:hover': {
            backgroundColor: "#dae26b",
        },
    },
}))(Button);

export default function AddStudent(data) {
    const [open, setOpen] = useState(false)
    const [studentsToAdd, setStudentsToAdd] = useState([])
    const dispatch = useDispatch()
    const classes = useStyles()    
    const usuarios = useSelector(state => state.usuarios.data)

    
    useEffect(() => {
        dispatch(traerUsuarios())
        
    }, [])

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setStudentsToAdd([])
        setOpen(false);
    };
    const handleToggle = (id) => {
        if(studentsToAdd.includes(id)){
            setStudentsToAdd(studentsToAdd.filter(function(idStudent){ return idStudent !== id}))
        }else{
            setStudentsToAdd([...studentsToAdd, id])
        }
    };
    
    const handleSubmit = () => {
        for(var i = 0; i < studentsToAdd.length; i++){
            dispatch(addUserToACohort(data.id, studentsToAdd[i]))
            dispatch(update())
        }
        handleClose()
        Swal.fire({
            icon: 'success',
            title: 'Se ha agregado un o varios henry/s',
        })
    }
    return (
        <div>
            <IconButton>
                <PersonAddIcon onClick={handleOpen}/>
            </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" className={classes.root}>
                <FormControl className={classes.inputContainer}>
                    <DialogTitle className={classes.nameTitle}>{data.name}</DialogTitle>
                    <List dense className={classes.users}>
                            <div style={{display: "flex", flexWrap: "wrap", flexDirection: "row", justifyContent: "center", alignItems: "center", maxWidth: "400px"}}>
                                {usuarios && usuarios.filter(function(usuario){return !usuario.admin && !usuario.instructor}).map((usuario) => {
                                    const labelId = `checkbox-list-secondary-label-${usuario.name}`;
                                    return (
                                    <ListItem className={classes.listItem} key={usuario.id}>
                                        <ListItemText id={labelId} primary={usuario.name + " " + usuario.lastName} />
                                        <ListItemSecondaryAction>
                                            <Checkbox
                                                edge="end"
                                                onChange={() => handleToggle(usuario.id)}
                                                checked={studentsToAdd.includes(usuario.id)}
                                            />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    );
                                })}
                            </div>
                        </List>
                </FormControl>
                <ColorButton onClick={handleSubmit}>
                    Listo
                </ColorButton>
            </Dialog>
        </div>
    )
}
