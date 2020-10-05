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
        height: '1000',
        background: 'url(https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80)',
        // background: 'url(https://visuallblogg.files.wordpress.com/2017/02/geometria-diseno-creatividad-arte-amarillo-fondos-de-pantalla-hd-professor-falken-com_.jpg)',
        // backgroundImage: 'url(https://images5.alphacoders.com/308/308300.jpg)',
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
