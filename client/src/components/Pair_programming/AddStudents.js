import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { traerUsuarios } from '../../redux/actions/user'
import { addStudentToGroupPp } from '../../redux/actions/pp'


import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { IconButton } from '@material-ui/core'
import { DialogTitle, FormControl } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { purple } from '@material-ui/core/colors';
import Swal from 'sweetalert2';


const useStyles = makeStyles((theme) => ({
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
export default function AddStudents(group){
    const classes = useStyles()
    const dispatch = useDispatch()
    const [studentsToAdd, setStudentsToAdd] = useState([])
    const [open, setOpen] = useState(false)
    const usuarios = useSelector(state => state.usuarios.data)

    useEffect(() => {
        dispatch(traerUsuarios())
        
    }, [])

    const handleToggle = (id) => {
        if(studentsToAdd.includes(id)){
            setStudentsToAdd(studentsToAdd.filter(function(idStudent){ return idStudent !== id}))
        }else{
            setStudentsToAdd([...studentsToAdd, id])
        }
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const handleCloseDialog = () => {
        setOpen(false)
    }

    const handleSubmit = () => {
        for(var i = 0; i < studentsToAdd.length; i++){
            console.log(studentsToAdd)
            var data = {userId: studentsToAdd[i], grouppId: group.data.id}
            var cohorteId =  group.data.cohorteId 
            dispatch(addStudentToGroupPp(cohorteId, data))
        }
        handleCloseDialog()
        Swal.fire({
            icon: 'success',
            title: 'Se ha agregado un o varios henry/s',
        })
    }
    return(
        <div>
            <IconButton>
                <PersonAddIcon onClick={handleOpen}/>
            </IconButton>
            <Dialog open={open} onClose={handleCloseDialog} aria-labelledby="form-dialog-title" className={classes.root}>
                <FormControl className={classes.inputContainer}>
                    <DialogTitle className={classes.nameTitle}>este es el nomnbre {group.data.name}</DialogTitle>
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
                    <ColorButton onClick={handleSubmit}>
                        Listo
                </ColorButton>
                </FormControl>
            </Dialog> 
        </div>
    )
}