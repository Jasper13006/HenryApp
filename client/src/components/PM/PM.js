import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { traerGrupoPm } from '../../redux/actions/pm';
import StudentsList from './StudentsList'



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
}));


export default function SimpleAccordion() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const pmGroup = useSelector(state => state.pm.data)
    const option = useSelector(state => state.panel.data)

    useEffect(() => {
        dispatch(traerGrupoPm(1))

    }, [])


    console.log(pmGroup)


    return (

        <div className={classes.root}>
            {!option ?
                <div>
                    <Accordion style={{ backgroundColor: "#FFDC00" }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon style={{ color: "black" }} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <img style={{ height: "80px", borderRadius: "50%" }} src="https://media-exp1.licdn.com/dms/image/C4D35AQHTRf0Cbu9-5w/profile-framedphoto-shrink_200_200/0?e=1602082800&v=beta&t=SgSzsYMJ-EbtxbpseeWBC13xb1tX1CiSUm8CCSU1GXc" alt="perfil" />
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
                            <img style={{ height: "80px", borderRadius: "50%" }} src="https://media-exp1.licdn.com/dms/image/C4D35AQHapbLki-9hYw/profile-framedphoto-shrink_200_200/0?e=1602082800&v=beta&t=yvRswq9HgNOR1_HX6gdyRxujDWTpscSjw5sWERxY0l0" alt="perfil" />
                            <Typography className={classes.heading2}>{pmGroup && pmGroup.PM2.name + " " + pmGroup.PM2.lastName}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography style={{ fontWeight: "bold", color: "white" }}>
                                Hola, soy {pmGroup && pmGroup.PM2.name}. Estoy para ayudarte en tus clases, si tenés alguna duda, escribime por privado.
                </Typography>
                        </AccordionDetails>

                    </Accordion> </div> :
                <StudentsList />

            }

        </div >
    );
}