import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getInstructors } from '../../../redux/actions/user'
import EditCohort from './EditCohort'
import AddStudent from './AddStudent'
import AddOneCohorte from './AddCohort'
import CohorteInfo from './CohorteInfo'
import imagenTriste from '../triste.png'
import { update } from '../../../redux/actions/update'

//imports de material UI
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import { CardActions, IconButton } from '@material-ui/core'


function encontrarInstructor(idUser, arrayInstructors){
    for(var i = 0; i < arrayInstructors.length; i++){
        if (arrayInstructors[i].id === idUser){
            return arrayInstructors[i].name + " " + arrayInstructors[i].lastName
        }
    }
}


const useStyles = makeStyles((theme) => ({
    instructorName: {
        ...theme.typography.button,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1),
        backgroundColor: "rgba(177,34,143,1) 0%",
        fontFamily: 'Raleway',
        width: "200px"
    },
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
    cardExtern: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    accordion: {
        background: "rgb(177,34,143)",
        background: "linear-gradient(135deg, rgba(177,34,143,1) 0%, rgba(69,181,210,1) 100%)",
    },
    cohortDetails: {
        display: "flex",
        justifyContent: "space-between",
    }
}))

export default function CohorteAdmin(){
    const classes = useStyles();
    const dispatch = useDispatch()
    const cohortes = useSelector(state => state.cohortes.data)
    const instructores = useSelector(state => state.instructors.data)

    useEffect(() => {
        dispatch(getInstructors())
    }, [])


    return (
        <div>
            <CardActions className={classes.cardExtern}>
                    <AddOneCohorte/>
            </CardActions>
            {cohortes && cohortes.length > 0 ? cohortes.map((cohorte) => (
            <Accordion className={classes.accordion}  key={cohorte.id}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon style={{ color: "black" }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <img style={{ height: "80px", borderRadius: "50%" }} src="https://i.pinimg.com/originals/f9/63/a6/f963a62eff1cd6f5b2903b1f3452b7b8.jpg" alt="perfil" />
                    <Typography className={classes.heading} style={{ color: "black" }} >{cohorte.name}</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.cohortDetails}>
                    <div className={classes.instructorName}>{cohorte && instructores && encontrarInstructor(cohorte.instructorId, instructores)}</div>
                    <div>
                        <CohorteInfo data={cohorte}/>
                    </div>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <EditCohort instructores={instructores} data={cohorte}/>
                        <AddStudent id={cohorte.id} name={cohorte.name}/>
                    </div>
                </AccordionDetails>
            </Accordion>)):
            <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
                <h3 style={{display: "flex", justifyContent: "center"}}>No hay ningun cohorte de momento</h3>
                <img src={imagenTriste}/>
            </div>
            }
        </div>
    )
}