import React from 'react';
import Register from './Register';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container, Box, Paper } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: "#000000",
        // paddingLeft: '320px',
        width: '100%',
        height: '100%',
        backgroundImage: 'url(https://images5.alphacoders.com/308/308300.jpg)',
        // opacity: '0.5',
        display: 'flex',
    },

}));

export default function RegisterMain() {
    const classes = useStyles();
    return (
        <>
            <CssBaseline />
            <Paper className={classes.paper}>
                <Register />
            </Paper>
        </>
    )
}
