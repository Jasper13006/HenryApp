import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { traerAlumnosPorGrupo } from '../../../redux/actions/student';
import { useSelector, useDispatch } from 'react-redux'
import AddStudentToGroup from './AddStudentToGroup'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonIcon from '@material-ui/icons/Person';
import { IconButton } from '@material-ui/core'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    dialog: {
        minWidth: "600px",


    }

}));



export default function AlertDialogSlide({ handleClose, id, cohorteId }) {

    const students = useSelector(state => state.studentsByGroupPM.data)
    const [openDialog, setOpenDialog] = React.useState(false);
    const dispatch = useDispatch();
    const classes = useStyles();


    const handleOpenDialog = () => {
        setOpenDialog(true);
        if (students) {
            dispatch(traerAlumnosPorGrupo(id))
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };


    return (
        <div>
            <IconButton title={"Ver estudiantes de este grupo"} onClick={handleOpenDialog} >
                <PersonIcon style={{ fontSize: "37px" }} />
            </IconButton>
            {openDialog && <Dialog
                open={openDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <div className={classes.dialog}>
                    <DialogTitle style={{ backgroundColor: "yellow", textAlign: "center", fontFamily: "-moz-initial", fontWeight: "bolder" }} id="alert-dialog-slide-title">{"Lista de alumnos "}  </DialogTitle>

                    {students && students.length > 0 ? students && students.map((student) => (
                        <div key={student.id}>
                            <DialogContent dividers={true} >
                                <DialogContentText style={{ fontWeight: "bolder", margin: "auto", fontFamily: "unset", textAlign: "center" }}>
                                    {<h3>{student.user.name + " " + student.user.lastName}</h3>}
                                </DialogContentText>
                            </DialogContent>

                        </div>
                    )) : <p style={{ textAlign: "center", fontWeight: "bolder" }}>SIN ESTUDIANTES</p>}
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button onClick={handleCloseDialog} variant="outlined" style={{ color: "black", fontWeight: "bolder", backgroundColor: "red" }}>
                            Cerrar
                    </Button>
                    </div>
                </div>


                {/* <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="form-dialog-title"> */}
                {/* <AddStudentToGroup id={id} cohorteId={cohorteId} /> */}
                {/* </Dialog>  */}
            </Dialog>}



        </div >
    );
}