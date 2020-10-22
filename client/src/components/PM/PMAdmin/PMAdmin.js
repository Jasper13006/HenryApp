import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { getCohortes } from '../../../redux/actions/cohorte';
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
    const cohortes = useSelector(state => state.cohortes.data)
    const test = useSelector(state => state)
    const [open, setOpen] = React.useState(false);
    const option = useSelector(state => state.panel.data)
    const user = JSON.parse(localStorage.getItem("user"))
    const [id, setId] = useState()

    useEffect(() => {
        dispatch(getCohortes())
    }, []);

    console.log(test)

    const handleClickOpen = (id) => {
        setId(id)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div className={classes.root}>

            {cohortes && cohortes.map((cohorte) => (
                <div>

                    <PmGroup cohorteName={cohorte.name} cohorteId={cohorte.id} handleClose={handleClose} handleClickOpen={handleClickOpen} />

                </div>
            ))
            }
        </div>
    );
}