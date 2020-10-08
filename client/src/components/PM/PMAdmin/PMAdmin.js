import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { getCohortes  } from '../../../redux/actions/cohorte';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import PmGroup from './PmGroup'
import Slide from '@material-ui/core/Slide';
import DialogActions from '@material-ui/core/DialogActions';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    root: {
        // flexGrow: 1,

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
        alignItems: "center",



    },


}));

export default function ComplexGrid() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const cohortes = useSelector(state => state.getCohorteUser.data)
    const [open, setOpen] = React.useState(false);
    const option = useSelector(state => state.panel.data)
    const user = JSON.parse(localStorage.getItem("user"))
    const [id, setId] = useState()

    useEffect(() => {
        dispatch(getCohortes())
    }, []);



    const handleClickOpen = (id) => {
        setId(id)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div className={classes.root}>

            {cohortes && cohortes.map((cohorte) => (<div key={cohorte.id}><Button onClick={() => handleClickOpen(cohorte.id)} style={{ fontSize: "30px", height: "150px", width: "270px", marginTop: "20px" }} variant="contained" color="primary" disableElevation>
                {cohorte.name}

            </Button>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    {open && <PmGroup cohorteId={id} />}
                    <DialogActions>
                    </DialogActions>
                </ Dialog>

            </div>
            ))
            }
        </div>
    );
}

