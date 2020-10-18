import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container, Box, Paper } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Login from './Login';

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: "#000000",

        width: '100%',
        height: '100%',
        background: 'url(https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80)',
        display: 'flex',
    },

}));

export default function RegisterMain() {
    const classes = useStyles();
    return (
        <>
            <CssBaseline />
            <Paper className={classes.paper}>
                <Login />
            </Paper>
        </>
    )
}