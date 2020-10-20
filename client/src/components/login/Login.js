import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from '../copyrigth/Copyrigth'
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import { CgGoogle } from 'react-icons/cg';
import { postLogin } from "../../redux/actions/login";
import { withStyles, } from '@material-ui/core/styles';

const InputTextField = withStyles({
    root: {
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        '& .MuiOutlinedInput-root': {
            color: '#ffffff',
            '& fieldset': {
                color: 'ffffff',
                borderColor: 'white',
            },
            '&:hover fieldset': {
                borderColor: '#ffffff',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#ffffff',
            },
        },
        '& .MuiFormLabel-root': {
            color: '#ffffff'
        }
    },
})(TextField);

const useStyles = makeStyles((theme) => ({   
    paper: {     
        background: "#21252985",
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#FFFF00',
        color: '#000000',
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    socialIcon: {
        fontSize: 40,
        color: '#ffffff',
        '&:hover': {
            color: '#1F4D80 '
        },     
    },
    containerSocial: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    googleIcon: {
        fontSize: 40,
        color: '#4285F4',
        '&:hover': {
            color: '#1F4D80 '
        },       
    },
    link: {
        color: '#ffffff',
        display: 'flex',
    },
    accede: {
        color: '#ffffff'
    },
    copyright: {
        color: '#ffffff'
    }
}));

export default function Login() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [state, setState] = useState({
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState({});
    const history = useHistory()

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
        if (!state.password) {           
            errors.password = 'Por favor, introduzca una contraseña';
        }       
        return errors;

    };
    const handleSubmit = (e) => {
        e.preventDefault();     
        if (state.email && state.password) {        
            dispatch(postLogin(state,history))
        }
    }


    return (
        <Container component="main" maxWidth="xs" className={classes.main}>
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar src='./henry.jpg' className={classes.avatar} >

            </Avatar>
            <Typography component="h1" variant="h5" className={classes.accede}>
                    Accede a tu cuenta
            </Typography>
            <div className='containerSocial'>
                <IconButton aria-label="Acceder con Github" component="span">
                    <GitHubIcon className={classes.socialIcon} />
                </IconButton>
                <IconButton aria-label='Acceder con Google' component='span'>
                    <CgGoogle className="iconGoogle" className={classes.googleIcon} />
                </IconButton>
            </div>
            <form className={classes.form} noValidate onChange={handleInputChange} onSubmit={handleSubmit}>
                <InputTextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"                    
                    autoFocus
                    value={state.email}
                    autoComplete='off'
                    />
                {errors.email && (<p style={{ color: "red" }}>{errors.email}</p>)}
                <InputTextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"                    
                    value={state.password}
                    autoComplete='off'
                    />
                {errors.password && (<p style={{ color: "red" }}>{errors.password}</p>)}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={!state.password || !state.email}
                    >
                    Entrar
                </Button>
                <Grid container display={'flex'}>
                    <Grid>
                        <Link href="http://localhost:3000/olvidemicontraseña" variant="body2" className={classes.link}>
                        Olvido Su contraseña?
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}