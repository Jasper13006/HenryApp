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
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Tooltip } from '@material-ui/core';


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
        margin: theme.spacing(1),
        position: "absolute",
        bottom: 0,
        right: 0


    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ handleClose, cohorteId }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const grupos = useSelector(state => state.pm.data)
    const [open, setOpen] = React.useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [id, setId] = useState();

    const handleOpenThis = (id) => {
        setId(id)
        setOpen(true)
    }

    console.log(id)

    const handleClickOpenAdd = () => {
        setOpenAdd(true);
    };

    const handleCloseAdd = () => {
        setOpenAdd(false);
    };


    useEffect(() => {
        dispatch(traerGrupoPmPorCohorte(cohorteId))
    }, []);



    return (
        <div>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton onClick={handleClose} edge="start" color="inherit" aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Grupos de PM
                    </Typography>
                </Toolbar>
            </AppBar>
            {(grupos && grupos.length > 0) && grupos.map((grupo) => (
                <div onClick={() => handleOpenThis(grupo.groupPm.id)} key={grupo.groupPm.id} >
                    <List >
                        <ListItem button >
                            <Dialog
                                open={open}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-slide-title"
                                aria-describedby="alert-dialog-slide-description"
                            >
                                {open && <StudentList handleClose={handleClose} id={id} />}
                            </Dialog>


                            <ListItemText primary={grupo.groupPm && grupo.groupPm.name} style={{ fontSize: "30px" }} />
                        </ListItem>
                        <Divider />
                    </List></div>
            ))
            }
            <div className={classes.margin}>

                <Fab onClick={setOpenAdd} style={{ color: "black", backgroundColor: "yellow" }} aria-label="add" >
                    <AddIcon />
                    <AddPmGroup handleCloseAdd={handleClose} open={openAdd} />
                </Fab>

            </div>
        </div >
    );
}