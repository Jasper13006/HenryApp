import React,{useEffect,useState} from 'react'
import './Perfil.css'
import {useSelector} from 'react-redux'
import { Button, CardActions, CardContent, FormLabel, IconButton, TextField, Tooltip, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import store from '../../redux/store/index'
import ImageDialog from './ImageDialog'
import FormControl from '@material-ui/core/FormControl';


const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: '0px',
        display: 'flex',
        flexDirection: 'column',
        padding:'20px',
        width: '400px',
        margin:'auto',
    },
    profileImage:{
        marginLeft:'10%',
        width: '80%',
    },
    card:{
        width:'300px',
        height:'400px',
        margin:'auto',
    },
    content:{
        width:'80%',
        margin:'auto',
        textAlign:'center',
    },
    paper:{
        width:'80%',
        display:'flex',
        margin:'auto',
    },
    passwordForm:{
        margin:'auto',
        maxWidth:'800px',
        textAlign:'center',
        padding: '20px',
    },
}));


export default function Perfil(){
    const classes = useStyles();
    const [option,setOption] =useState(0)
    const [user,setUser] = useState(null)
    const menuOption=useSelector(state=>state.panel.data)

    useEffect(()=> {
        setUser(store.getState().usuario.user)
    }, [])

    useEffect(()=>{
        setOption(menuOption)
    })

    const usuario=JSON.parse(localStorage.getItem("user"))
    console.log("usuario :",usuario)

    const formatString =(string)=>{
        if(string){
            let arr = string.split("")
            arr[0]=arr[0].toUpperCase()
            let noSpaces=arr.join("")
            return(noSpaces)
            }
        return("")
        
    }

    const editPhoto=()=>{
        console.log("listo")
    }

    return (
        <div>
        {(!option)?
            <div className={classes.root}>
            {usuario &&
                <Card className={classes.card}>
                    <CardActionArea>
                    <img src={usuario.image} alt="user Image" className={classes.profileImage}/>
                    <CardContent className={classes.content}>
                        <Typography variant="h5" component="h2">
                            {formatString(usuario.name)+" "+formatString(usuario.lastName)}
                        </Typography>
                        <Typography variant="body2">
                            {usuario.email}
                        </Typography>
                        {(usuario.city && usuario.country)?
                        <Typography variant="body2">
                            formatString(usuario.city)+", "+formatString(usuario.country)}
                        </Typography>
                        :null}
                    </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Tooltip title="editar">
                            <IconButton onClick={editPhoto} >
                                <ImageDialog user={usuario} formatString={formatString}/>
                            </IconButton>
                        </Tooltip>
                    </CardActions>
                </Card>}
            </div>
    :null}
    {option===1 && usuario &&
    <Paper className={classes.paper}>
    <FormControl className={classes.passwordForm}>
        <Typography variant="h5">Cambiar contraseña</Typography>
        <br/>
        <TextField label="contraseña actual" variant="outlined"/>
        <br/>
        <TextField label="nueva contraseña" variant="outlined"/>
        <br/>
        <TextField label="repita nueva contraseña" variant="outlined"/>
        <br/>
        <Button variant="outlined">Enviar</Button>
    </FormControl>
    </Paper>
    }
    </div>
    )
}