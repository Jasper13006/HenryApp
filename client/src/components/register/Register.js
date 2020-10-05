import React from 'react';
import { Container, Typography } from "@material-ui/core";
import RegisterForm from './RegisterForm'
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        backgroundcolor: '#FFFFFF1A', // El mismo que antes, blanco con 50% de transparencia.
        // background: ' linear-gradient(90deg, #020024 0%, #090979 40%, #00d4ff 100%)',
        // backgroundColor: "#fff  ",
        marginTop: theme.spacing(14),
        // padding: theme.spacing(8),
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        // opacity: '0.6',
        color: '#ffffff'
    },
    register: {
        color: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)    '
    }

}));

const SignupForm = () => {
    const classes = useStyles()
    return (
        <Container component="main" maxWidth='sm'>
            <CssBaseline />
            <div className={classes.paper}>
                <Typography variant='h3' className={classes.register}>
                    Ingrese sus datos
                </Typography>
                <RegisterForm />
            </div>
        </Container>
    );
};
export default SignupForm;