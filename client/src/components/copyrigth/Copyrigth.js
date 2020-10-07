import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    copy: {
        color: '#ffffff'
    }
}))
export default function Copyright() {
    const classes = useStyles()
    return (
        <Typography variant="body2" className={classes.copy} align="center">
            {'Copyright © '}
            <Link className={classes.copy} href="https://localhost:3000/">
                HenryApp
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}