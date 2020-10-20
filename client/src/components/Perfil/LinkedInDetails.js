import React, {useState, useEffect} from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import EditIcon from '@material-ui/icons/Edit'
import { DialogTitle, FormControl, Table, TableBody, TableCell, TableRow, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {useDispatch} from 'react-redux'
import { changeUserData } from '../../redux/actions/user'
import {update} from '../../redux/actions/update'
import './Perfil.css'
import useFetch from './hooks/useFetch'
import SocialNetworkDialog from './SocialNetworkDialog'

const useStyles = makeStyles(() => ({
    title: {
        textAlign:'center',
    },
    top:{
        display:'flex',
        flexDirection: 'row',
    },
    bio:{
        width:'80%',
        marginLeft:'10%',
        marginTop:'20px',
        fontSize:'100%',
    },
  }));

export default function LInkedInDetails({data, usuario, token}){
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const [value,setValue] = useState(data)
    const dispatch =  useDispatch()
    

    const handleClickOpen = () => {
        setOpen(true);
    }
    
    const handleClose = () => {
        setOpen(false);
    }

    const handleDelete = () =>{
        data={googleId : "empty"}
        dispatch(changeUserData(data,usuario.id,token))
        setTimeout(()=>{
            dispatch(update())
        },2000)
        handleClose()
    }

    const handleChange =(e)=>{
        setValue(e.target.value)
    }

    const handleUpdate = ()=>{
        data={googleId : value}
        dispatch(changeUserData(data,usuario.id,token))
        setTimeout(()=>{
            dispatch(update())
        },2000)
        handleClose()
    }
 

    return(
        <>
        {usuario && <>
        <Button onClick={handleClickOpen}>{data}</Button>
        <Dialog open={open}>
            <DialogContent>
                <Typography className={classes.title}>Enlace de LinkedIn</Typography>
                <TextField
                    defaultValue={data}
                    variant="outlined"
                    onChange={handleChange}></TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDelete} color="primary" variant="outlined">
                    Eliminar
                </Button>
                <Button onClick={handleUpdate} color="primary" variant="outlined">
                    Editar
                </Button>
                <Button onClick={handleClose} color="primary" variant="outlined">
                    Cerrar
                </Button>

            </DialogActions>
        </Dialog>
        </>}
        </>
    )
}