import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from '../copyrigth/Copyrigth'
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import { CgGoogle } from 'react-icons/cg';
import { postLogin } from "../../redux/actions/login";

const useStyles = makeStyles((theme) => ({
    main: {
        // backgroundColor: "#455a64",
    },
    paper: {
        // background: radial-gradient(circle, rgba(255,255,1,1) 43%, rgba(0,0,0,1) 100%);
        // backgroundImage:,
        // backgroundImage: './308300.jpg',
        backgroundColor: "#fff  ",
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#000000',
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
        color: '#24292E',
        '&:hover': {
            color: '#1F4D80 '
        },
        // margin: theme.spacing(3, 0, 2),
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
        // margin: theme.spacing(3, 0, 2),
    },

}));

export default function Login() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [state, setState] = useState({
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }

    const validate = (state) => {
        let errors = {};
        if (!state.email) {
            errors.email = 'Por favor, introduzca un email';
        } else if (!state.email.includes("@")) {
            errors.email = 'Por favor, introduzca un formato de email valido';
        }
        if (!state.password) {
            errors.password = 'Por favor, introduzca una contraseña';
        }
        console.log(errors)
        return errors;

    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validate({
            ...state,
            [e.target.name]: e.target.value
        }));
        // console.log(e)
        if (state.email && state.password) {
            // console.log(state)
            dispatch(postLogin(state))
        }
    }


    return (
        <Container component="main" maxWidth="xs" className={classes.main}>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar src='./henry.jpg' className={classes.avatar} >

                </Avatar>
                <Typography component="h1" variant="h5">
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
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    /> */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Entrar
          </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="http://localhost:3000/olvidemicontraseña" variant="body2">
                                Olvido Su contraseña?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="http://localhost:3000/register" variant="body2">
                                {"No tiene cuenta? Registrese"}
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