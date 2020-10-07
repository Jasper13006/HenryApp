import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getInstructors } from '../../redux/actions/user'


import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';




function encontrarInstructor(idUser, arrayInstructors){
    for(var i = 0; i < arrayInstructors.length; i++){
        if (arrayInstructors[i].id === idUser){
            return arrayInstructors[i].name + " " + arrayInstructors[i].lastName
        }
    }
}


const useStyles = makeStyles((theme) => ({
    heading: {

        display: "flex",
        margin: "auto",
        alignItems: "center",
        color: "black",


        fontSize: theme.typography.pxToRem(15),
        fontWeight: "bolder",
        height: '80px',
        fontSize: "30px"
    },
    fab: {
        display: "flex",
        margin: theme.spacing(2),
    },
    buttonAdd: {
        display: "flex",
        justifyContent: "flex-end",

    },
}))

export default function CohorteAdmin(){
    const classes = useStyles();
    const dispatch = useDispatch()
    const cohortes = useSelector(state => state.cohortes.data)
    const instructores = useSelector(state => state.instructors.data)

    useEffect(() => {
        dispatch(getInstructors())
    }, [])
    instructores && console.log(instructores, cohortes)
    return (
        <div>
            <div className= {classes.buttonAdd}>
                <Tooltip title="Add" aria-label="add">
                    <Fab color="primary" className={classes.fab}>
                    <AddIcon />
                    </Fab>
                </Tooltip>
            </div>
            {cohortes && cohortes.length > 0 && cohortes.map((cohorte) => (
            <Accordion style={{ backgroundColor: "#FFDC00" }} key={cohorte.id}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: "black" }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <img style={{ height: "80px", borderRadius: "50%" }} src="https://i.pinimg.com/originals/f9/63/a6/f963a62eff1cd6f5b2903b1f3452b7b8.jpg" alt="perfil" />
                    <Typography className={classes.heading} style={{ color: "black" }} >{cohorte && cohorte.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography style={{ fontWeight: "bold" }}>
                        instructor: {encontrarInstructor(cohorte.instructorId, instructores)}
                    </Typography>
                </AccordionDetails>
            </Accordion>))
            }
        </div>
    )
}