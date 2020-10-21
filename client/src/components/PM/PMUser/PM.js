import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { traerGrupoPm } from '../../../redux/actions/pm';
import StudentsList from './StudentsList'
import PMAdmin from '../PMAdmin/PMAdmin'
import axios from 'axios'
import { getStudent } from '../../../redux/actions/user'
import Swal from 'sweetalert2'
const imgTriste = require("../../Cohorte/triste.png")





const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: "auto",

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
    heading2: {
        // position: "relative",
        // left: "200px",
        display: "flex",
        margin: "auto",
        alignItems: "center",
        color: "white",


        fontSize: theme.typography.pxToRem(15),
        fontWeight: "bolder",
        height: '80px',
        fontSize: "30px"
    },
    typographyTitle: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
}));


export default function SimpleAccordion() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const pmGroup = useSelector(state => state.groupPm.data && state.groupPm.data.gpm)
    const students = useSelector(state => state.student.data)
    const option = useSelector(state => state.panel.data)
    const test = useSelector(state => state)
    const user = JSON.parse(localStorage.getItem("user"))
    const [unique, setUnique] = useState()
    const [active, setActive] = useState(false)
    const [active2, setActive2] = useState(false)

    const token = localStorage.getItem("token")

    console.log(test)

    useEffect(() => {
        dispatch(getStudent(user.id))

    }, [])



    if (students && students.length > 0 && !active) {
        axios({
            method: "GET",
            url: `http://localhost:3001/student/${students[0].userId}`,
            headers: { "auth-token": token }
        }).then((res) => {
            setUnique(res.data[0].grouppmId)
        }).catch(err => alert(err))
        setActive(true)
    }

    if (unique && !active2) {
        dispatch(traerGrupoPm(unique))
        setActive2(true)
    }

    console.log(pmGroup)
    return (

        <div className={classes.root}>
            {user && user.admin ? <div>
                <PMAdmin />
            </div>
                :
                unique && unique ?
                    !option ?
                        <div>
                            <Accordion style={{ backgroundColor: "#FFDC00" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon style={{ color: "black" }} />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <img style={{ height: "80px", borderRadius: "50%" }} src={pmGroup && pmGroup.PM1.image} alt="perfil" />
                                    <Typography className={classes.heading} style={{ color: "black" }} >{pmGroup && pmGroup.PM1.name + " " + pmGroup.PM1.lastName}</Typography>

                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography style={{ fontWeight: "bold" }}>
                                        Hola, soy {pmGroup && pmGroup.PM1.name}. Estoy para ayudarte en tus clases, si tenés alguna duda, escribime por privado.
                </Typography>
                                </AccordionDetails>
                            </Accordion >
                            <Accordion style={{ backgroundColor: "black", }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon style={{ color: "yellow" }} />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"

                                >
                                    <img style={{ height: "80px", borderRadius: "50%" }} src={pmGroup && pmGroup.PM2.image} alt="perfil" />
                                    <Typography className={classes.heading2}>{pmGroup && pmGroup.PM2.name + " " + pmGroup.PM2.lastName}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography style={{ fontWeight: "bold", color: "white" }}>
                                        Hola, soy {pmGroup && pmGroup.PM2.name}. Estoy para ayudarte en tus clases, si tenés alguna duda, escribime por privado.
                </Typography>
                                </AccordionDetails>

                            </Accordion> </div> :

                        <StudentsList id={unique} /> :
                    <div className={classes.typographyTitle}>
                        <Typography variant="h3" component="h2" gutterBottom>
                            No perteneces a grupo por el momento
                        </Typography>
                        <img src={imgTriste} />
                    </div>

            }

        </div>

    );


}