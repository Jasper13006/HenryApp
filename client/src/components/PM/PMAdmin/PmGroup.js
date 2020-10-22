import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { traerGrupoPmPorCohorte } from '../../../redux/actions/pm';
import { traerGrupoPm } from '../../../redux/actions/pm';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import StudentList from './StudentList'
import AddPmGroup from './AddPmGroup'

import { Tooltip } from '@material-ui/core';
import { update } from '../../../redux/actions/update.js'
import ShowPms from './ShowPms'
import Button from '@material-ui/core/Button';
import AddStudentToGroup from './AddStudentToGroup'

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        backgroundColor: "yellow",
        color: "black",
        fontWeight: "bolder"
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    margin: {
        margin: theme.spacing(2),
        position: "sticky",
        bottom: 0,
        right: 0



    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(data) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const grupos = useSelector(state => state.pm.data)
    const updateThis = useSelector(state => state.update)
    const [open, setOpen] = React.useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [id, setId] = useState();


    const handleClickOpen = () => {
        setOpen(true)
        dispatch(traerGrupoPmPorCohorte(data.cohorteId))
    }

    const handleClose = () => {
        setOpen(false)
    }



    console.log(data.cohorteId)
    return (
        <div>
            <Button onClick={handleClickOpen} style={{ fontSize: "30px", height: "150px", width: "270px", marginTop: "20px", fontFamily: "-moz-initial" }} variant="contained" color="primary" disableElevation>
                {data.cohorteName}
            </Button>

            {open && <Dialog fullScreen={true} fullWidth={true} open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton onClick={handleClose} edge="start" color="inherit" aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Grupos de PM
                    </Typography>
                        <AddPmGroup cohorteId={data.cohorteId} handleCloseAll={handleClose} openGeneral={open} />
                    </Toolbar>
                </AppBar>
                {(grupos && grupos.length > 0) && grupos.map((grupo) => (
                    <div key={grupo.groupPm.id} >
                        <List >
                            <ListItem  >


                                <ListItemText primary={<h2 style={{ fontSize: "28px" }}>{grupo.groupPm && grupo.groupPm.name}</h2>} style={{ textAlign: "left" }} />
                                <StudentList id={grupo.groupPm.id} cohorteId={data.cohorteId} />
                                <AddStudentToGroup id={grupo.groupPm.id} cohorteId={data.cohorteId} handleCloseGeneral={handleClose} openGeneral={open} />
                                <ShowPms idGroup={grupo.groupPm.id} handleCloseGeneral={handleClose} openGeneral={open} cohorteId={data.cohorteId} />


                            </ListItem>
                            <Divider />
                        </List></div>
                ))
                }
                <div className={classes.margin}>




                </div>
            </Dialog>}
        </div >
    );
}