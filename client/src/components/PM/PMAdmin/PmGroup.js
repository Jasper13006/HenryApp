import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { traerGrupoPmPorCohorte } from '../../../redux/actions/pm';
import { traerGrupoPm } from '../../../redux/actions/pm';
import Slide from '@material-ui/core/Slide';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,

    },
}));

export default function AlertDialogSlide({ cohorteId }) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const grupos = useSelector(state => state.pm.data)
    const classes = useStyles();

    useEffect(() => {
        dispatch(traerGrupoPmPorCohorte(cohorteId))
        dispatch(traerGrupoPm(cohorteId))

    }, []);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <DialogTitle id="alert-dialog-slide-title">{"Grupos de este cohorte"}</DialogTitle>



            {grupos && grupos.length > 0 && grupos.map((grupo) => (
                <div key={grupo.id}>
                    <DialogContent >

                        <DialogContentText id="alert-dialog-slide-description">


                            <Accordion  >
                                <AccordionSummary

                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >

                                    <Typography component={"span"} className={classes.heading}> {grupo.groupPm.name}</Typography>
                                </AccordionSummary>
                                {grupo.students && grupo.students.map((student) => (

                                    <AccordionDetails key={student.id}>


                                        <Typography component={"span"}>
                                            {student.user.name + " " + student.user.lastName}
                                        </Typography>

                                    </AccordionDetails>
                                ))
                                }

                            </Accordion>


                        </DialogContentText>

                    </DialogContent>
                </div>
            ))
            }




        </div >
    );
}