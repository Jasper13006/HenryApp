import React,{useEffect,useState} from 'react'
import './Perfil.css'
import {useSelector,useDispatch} from 'react-redux'
import { Button, CardActions, CardContent, FormLabel, IconButton, TextField, Tooltip, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import ImageDialog from './ImageDialog'
import FormControl from '@material-ui/core/FormControl';
import {changeUserData} from '../../redux/actions/user'
import Swal from 'sweetalert2'


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
        height:'450px',
        margin:'auto',
    },
    cardActionArea:{
        height:'350px',
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
    const [errors,setErrors] = useState({})
    const [input,setInput] = useState({
        oldPassword:'',
        newPassword:'',
        repeatNewPassword:'',
    })
    const option=useSelector(state=>state.panel.data)
    const usuario=JSON.parse(localStorage.getItem("user"))
    const token=localStorage.getItem("token")
    const dispatch=useDispatch()

    // const token=useSelector(state=>state.login.data)
    // const usuario = useSelector(state=>state.usuario.data)

    const formatString =(string)=>{
        if(string){
            let arr = string.split("")
            arr[0]=arr[0].toUpperCase()
            let noSpaces=arr.join("")
            return(noSpaces)
            }
        return("")
        
    }

    const validate = (state) => {
        let errors = {};
        if (state.oldPassword==='') {
            errors.oldPassword = 'Debe introducir su contraseña actual';
        }
        if (state.newPassword==='') {
            errors.password = 'Se requiere una nueva contraseña'
        }
        if (state.repeatNewPassword!==state.newPassword){
            errors.repeatNewPassword = 'Las contraseñas no coinciden'
        }
        if(Object.keys(errors).length===0){
            return(null)
        }
        return errors;
    }

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log("handlesubmit")
        if (input.oldPassword && input.newPassword) {
            console.log("en el if")
            const data={}
            data.password=input.oldPassword
            data.newPassword=input.newPassword
            dispatch(changeUserData(data,usuario.id,token))
            Swal.fire({
                icon: 'success',
                title: 'Se han actualizado tus datos',
                showConfirmButton: false,
                timer: 1500
            })
            setInput({
                oldPassword:'',
                newPassword:'',
                repeatNewPassword:'',
            })
        }
    }

    return (
        <div>
        {!option?
            <div className={classes.root}>
            {usuario &&
                <Card className={classes.card}>
                    <CardActionArea className={classes.cardActionArea}>
                    <img src={usuario.image} alt="user Image" className={classes.profileImage}/>
                    <CardContent className={classes.content}>
                        <Typography component="h2" variant="h6">
                            {formatString(usuario.name)+" "+formatString(usuario.lastName)}
                        </Typography>
                        <Typography variant="body2">
                            {usuario.email}
                        </Typography>
                        {(usuario.city && usuario.country)?
                        <Typography variant="body2">
                            {formatString(usuario.city)+", "+formatString(usuario.country)}
                        </Typography>
                        :null}
                    </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Tooltip title="editar">
                            <IconButton>
                                <ImageDialog user={usuario} formatString={formatString}/>
                            </IconButton>
                        </Tooltip>
                    </CardActions>
                </Card>}
            </div>
    :null}
    {option===1 && usuario &&
    <Paper className={classes.paper}>
        <FormControl 
            className={classes.passwordForm} 
            onChange={handleInputChange}>
            <Typography component="h2" variant="h5">Cambiar contraseña</Typography><br/>
            {errors?(<p style={{ color: "red" }}>{errors.oldPassword}</p>):<br/>}
            <TextField 
                name="oldPassword"
                type="password"
                label="contraseña actual" 
                variant="outlined"
                margin="normal"
                autoFocus
                value={input.oldPassword}/>
            {errors?(<p style={{ color: "red" }}>{errors.newPassword}</p>):<br/>}
            <TextField 
                name="newPassword"
                type="password"
                label="nueva contraseña" 
                variant="outlined"
                value={input.newPassword}/>
            {errors?(<p style={{ color: "red" }}>{errors.repeatNewPassword}</p>):<br/>}   
            <TextField 
                name="repeatNewPassword"
                type="password"
                label="repita nueva contraseña" 
                variant="outlined"
                value={input.repeatNewPassword}/><br/>
            <Button 
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={errors?true:false}
                >Enviar</Button><br/>
        </FormControl>
    </Paper>
    }
    </div>
    )
}