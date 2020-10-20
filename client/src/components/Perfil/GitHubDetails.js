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
    avatar: {
        width:'120px',
        margin: 'auto',
        borderRadius: '50%',
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

export default function GitHubDetails({data, usuario, token}){
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const getGitHubUser = useFetch('https://api.github.com/users/') 
    const [user,setUser] = useState(null)
    const dispatch =  useDispatch()
    
    useEffect(()=>{
        async function userFromGH(){
            const ghu = await getGitHubUser(data)
            setUser(ghu)
        }
        userFromGH()
    },[])

    const handleClickOpen = () => {
        setOpen(true);
    }
    
    const handleClose = () => {
        setOpen(false);
    }

    const handleDelete = () =>{
        data={gitHubId : "empty"}
        dispatch(changeUserData(data,usuario.id,token))
        setTimeout(()=>{
            dispatch(update())
        },2000)
        handleClose()
    }
 

    return(
        <>
        {user && <>
        <Button onClick={handleClickOpen}>{data}</Button>
        <Dialog open={open}>
            <DialogContent>
                <div className={classes.top}>
                    <a href={user.html_url} target="_blank">
                        <img src={user.avatar_url} alt="avatar" className={classes.avatar}/>
                    </a>
                    <Typography className={classes.bio}>{'"'+user.bio+'"'}</Typography>
                </div>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>{user.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Usuario</TableCell>
                            <TableCell>{user.login}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>GitHub Id</TableCell>
                            <TableCell>{user.id}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Seguidores</TableCell>
                            <TableCell>{user.followers}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Siguiendo</TableCell>
                            <TableCell>{user.following}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Repositorios públicos</TableCell>
                            <TableCell>{user.public_repos}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDelete} color="primary" variant="outlined">
                    Eliminar Usuario de GitHub
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
