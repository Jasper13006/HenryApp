import React from 'react';
import { Container } from "@material-ui/core";
import EmployeeForm from './EmployeeForm'
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: "#fff  ",
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

}));

const SignupForm = () => {
    const classes = useStyles()
    return (
        <Container component="main" maxWidth='lg'>
            <CssBaseline />
            <div className={classes.paper}>
                <EmployeeForm />
            </div>
        </Container>
    );
};
export default SignupForm;