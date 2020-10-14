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


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ handleClose, id, cohorteId }) {

    const students = useSelector(state => state.student.data)
    const [openDialog, setOpenDialog] = React.useState(false);
    const [active, setActive] = useState(false)
    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(traerAlumnosPorGrupo(id))
    }, [])



    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };


    return (
        <div>

            <DialogTitle style={{ backgroundColor: "yellow", align: "center", fontFamily: "-moz-initial", fontWeight: "bolder" }} id="alert-dialog-slide-title">{"Lista de alumnos "} </DialogTitle>
            {students && students.length > 0 ? students && students.map((student) => (
                <div key={student.id}>
                    <DialogContent dividers={true} >
                        <DialogContentText style={{ fontWeight: "bolder", margin: "auto", fontFamily: "unset" }}>
                            {student.user.name + " " + student.user.lastName}
                        </DialogContentText>
                    </DialogContent>
                </div>
            )) : <p style={{ textAlign: "center", fontWeight: "bolder" }}>SIN ESTUDIANTES</p>}

            <Button color="primary" onClick={handleClose} style={{ position: "relative", left: "130px", fontWeight: "bold" }}>
                Cerrar
          </Button>

            <Button color="primary" onClick={handleOpenDialog} style={{ position: "relative", right: "60px", fontWeight: "bold" }} >
                Agregar
                </Button>
            <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
                {openDialog && <AddStudentToGroup handleClose={handleClose} id={id} cohorteId={cohorteId} />}
            </Dialog>



        </div >
    );
}