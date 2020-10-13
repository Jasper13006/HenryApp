import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import{ Typography, Backdrop, CircularProgress}from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {yellow} from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
import Axios from 'axios';
import Excel from './ExcelInv'
import Swal from 'sweetalert2'



const useStyles = makeStyles((theme) => ({    
    main: {
        //backgroundColor: "#455a64",
        
    },
    paper: {
        backgroundColor: "#fff  ",
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '27px'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor:'yellow',
        color:'black',
        '&:hover': {
            backgroundColor: 'black',
            color: 'yellow'
        }
        
    },
    socialIcon: {
        fontSize: 40,
        color: '#24292E',
        '&:hover': {
            color: '#1F4D80 '
        },
        
    },
    containerSocial: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },    
    

}));

export default function Login() {
    const classes = useStyles();
    const [state, setState] = useState({
        email: '',
        name: '',
    })
    const [errors, setErrors] = useState({});
    const [open, setOpen] = useState(false);

    const handleInputChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
       
    }
    const option=useSelector(state=>state.panel.data)

    const validate = (state) => {
        let errors = {};
        if (!state.email) {
            console.log('first if', errors)
            errors.email = 'Por favor, introduzca un email';
        } else if (!state.email.includes("@")) {
            console.log('second if', errors)
            errors.email = 'Por favor, introduzca un formato de email valido';
        }
        if (!state.name) {
            errors.name = 'Por favor, introduzca un nombre';
        }
        // console.log(errors)
        return errors;

    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validate({
            ...state,
            [e.target.name]: e.target.value
        }));
        // console.log(e)
        console.log(errors)
        if (state.email && state.name) {
            const data = {
                email:state.email,
                name:state.name
            }
            sendEmail(data)
        }
    }
   
    async function sendEmail (data){
        setOpen(true)
        try {
            const send = await Axios.post('http://localhost:3001/invite/send',data)
            console.log(send)
            setOpen(false)
            if(send.data.status === 400){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: send.data.msg
                    
                })
            }else{
                Swal.fire({
                    icon: 'success',
                    title: 'Se ha enviado una invitacion',
                    
                })
            }   
        }catch(err){
            setOpen(false)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "no se ha podido enviar la invitacion"
                
            })
            
        } 
        
    }

    return (
        <div>
            <Container component="main" maxWidth="xs" className={classes.main}>
            
            <CssBaseline />
            {!option && <div className={classes.paper}>
                <Avatar src='./henry.jpg' className={classes.avatar} >

                </Avatar>
                <Typography component="h1" variant="h5">
                    Enviar email de invitación
                </Typography>
                <form className={classes.form} noValidate onChange={handleInputChange} onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    {errors.email && (
                        <p style={{ color: "red" }}>{errors.email}</p>
                    )}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                    />
                    {errors.name && (
                        <p style={{ color: "red" }}>{errors.name}</p>
                    )}
                    
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                    >
                        Enviar
                    </Button>
                    <Backdrop className={classes.backdrop} open={open}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </form>
            </div>}          
            </Container>
            {option ? <Excel/> : null}
        </div>
        
    );
}