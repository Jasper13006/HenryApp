import React, { useState} from 'react';
import { useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import{ Typography, FormControl, InputLabel, Select, MenuItem}from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import Swal from 'sweetalert2'
import Consultar from './Consultar'
import Tabla from './Tabla'



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
}));

export default function Calificar() {
    const classes = useStyles();
    const [state, setState] = useState({
        email: '',
        qualification: '',
        info: '',
    })
    const [errors, setErrors] = useState({});
    const [name, setName] = useState('');  
    const token = localStorage.getItem("token")  
    const option=useSelector(state=>state.panel.data)
    
    const handleNameChange = (e) => {
        setName(e.target.value)            
    }

    const handleInputChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
        setErrors(validate({
            ...state,
            [e.target.name]: e.target.value
        }));       
    }

    const validate = (state) => {
        let errors = {};
        if (!state.email) {          
            errors.email = 'Por favor, introduzca un email';
        } else if (!/\S+@\S+\.\S+/.test(state.email)) {           
            errors.email = 'Por favor, introduzca un formato de email valido';
        }      
        return errors;

    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = await axios({
            method: 'POST',
            url: 'http://localhost:3001/user/email',
            data: {email: state.email}
            })         
        if (user.data.status == 400){   
            Swal.fire('Error', 'usuario inexistente', 'error');
            return}       
        if (user.data.status == 200){
            const data0 = { name: name}   
            console.log(data0)    
            const data = {                
                name: name,
                qualification: state.qualification,
                info: state.info                
            }
            const notarepetida = await axios({
                method: 'POST',
                url: `http://localhost:3001/user/nota-checkpoint/repetida/${user.data.usuario.id}`,
                credentials: "include",
                headers: { "auth-token": token },
                data: data0
            })            
            if (notarepetida.data){
                await axios({
                    method: 'PUT',
                    url: `http://localhost:3001/user/nota-checkpoint/${user.data.usuario.id}`,
                    credentials: "include",
                    headers: { "auth-token": token },
                    data: data
                    })                 
            }else{                
                await axios({
                method: 'POST',
                url: `http://localhost:3001/user/nota-checkpoint/${user.data.usuario.id}`,
                credentials: "include",
                headers: { "auth-token": token },
                data: data
                })
            }
            Swal.fire('Success', 'calificación creada', 'success')
            setState({
                email: '',
                qualification: '',
                info: '',
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
                    Calificar usuario
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
                        value={state.email}
                    />
                    {errors.email && (
                        <p style={{ color: "red" }}>{errors.email}</p>
                    )}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="qualification"
                        label="qualification"
                        name="qualification"
                        autoComplete="qualification"
                        autoFocus      
                        value={state.qualification}                  
                    />
                     <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="info"
                        label="info"
                        name="info"
                        autoComplete="info"
                        autoFocus
                        value={state.info} 
                    />
                    <FormControl>
                    <Typography>Instancia</Typography>
                    <Select
                        label="Instancia"                        
                        value={name}
                        onChange={handleNameChange}
                        >
                        <MenuItem value={'check1'}>Check1</MenuItem>
                        <MenuItem value={'check2'}>Check2</MenuItem>
                        <MenuItem value={'check3'}>Check3</MenuItem>
                        <MenuItem value={'check4'}>Check4</MenuItem>
                        <MenuItem value={'henrylab'}>Henrylab</MenuItem>
                    </Select>  
                    </FormControl>               
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                        disabled={!state.email || !state.qualification || !name}
                    >
                        Enviar
                    </Button>                    
                </form>
             </div>}       
            </Container>     
            {option===1 && <Consultar/>}
            {option===2 && <Tabla/>  }           
        </div>
        
    );
}