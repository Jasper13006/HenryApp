import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { traerGrupoPm } from '../../../redux/actions/pm';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import EditPms from './EditPms'
import SchoolIcon from '@material-ui/icons/School';
import { IconButton } from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress';


const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
    dialog: {
        height: "300px",
        width: "400px",
        alignItems: "center",


    },
    avatar: {
        // zIndex: "100%",
        alignItems: "center",
    },
    listItem: {
        alignItems: "center",
        display: "flex",
        // justifyContent: "space-"
    },

});

export default function SimpleDialog({ idGroup, handleCloseGeneral, openGeneral, cohorteId }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [id, setId] = useState();
    const dispatch = useDispatch();
    const pms = useSelector(state => state.groupPm.data)

    // useEffect(() => {

    // }, [])


    const handleClickOpen = () => {
        dispatch(traerGrupoPm(idGroup))
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    // const handleListItemClick = (value) => {
    //     onClose(value);
    // };

    return (
        <div>
            <IconButton onClick={handleClickOpen} title={"Ver PMS"}><SchoolIcon style={{ fontSize: "37px" }} /></IconButton>

            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <div className={classes.dialog}>
                    <DialogTitle id="simple-dialog-title" style={{ textAlign: "center", backgroundColor: "yellow", color: "black", fontWeight: "bolder" }}>PM'S de este grupo</DialogTitle>


                    {pms && pms.gpm.PM1 && pms.gpm.PM2 ?
                        <List style={{ margin: "auto" }}>
                            <ListItem className={classes.listItem} >
                                <ListItemAvatar>
                                    <div >
                                        <img src={pms && pms.gpm.PM1.image} style={{ borderRadius: "50%", height: "50px" }} ></img>
                                    </div>
                                </ListItemAvatar>
                                <li> <h2 style={{ marginLeft: "25px" }}>{pms && pms.gpm.PM1.name + " " + pms.gpm.PM1.lastName}</h2></li>
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <ListItemAvatar>
                                    <div >
                                        <img src={pms && pms.gpm.PM2.image} style={{ borderRadius: "50%", height: "50px" }} ></img>
                                    </div>
                                </ListItemAvatar>
                                <li> <h2 style={{ marginLeft: "25px" }}>{pms && pms.gpm.PM2.name + " " + pms.gpm.PM2.lastName}</h2> </li>
                            </ListItem>  </List> :
                        <div >
                            <LinearProgress />
                        </div>}





                </div>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
                    <EditPms handleClosePrev={handleClose} openGeneral={openGeneral} cohorteId={cohorteId} handleCloseGeneral={handleCloseGeneral} idGroup={idGroup} />
                </div>
            </Dialog>

        </div >
    );
}
