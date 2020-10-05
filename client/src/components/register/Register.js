import React from 'react';
import { Container, Typography } from "@material-ui/core";
import RegisterForm from './RegisterForm'
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundcolor: '#FFFFFF1A', // El mismo que antes, blanco con 50% de transparencia.
        marginTop: theme.spacing(14),
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
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
            {/* <CssBaseline /> */}
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