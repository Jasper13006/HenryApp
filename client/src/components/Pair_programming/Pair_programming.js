import React, { useState, useEffect } from 'react';
import './Pair_programming.css';
import { getCohortes } from '../../redux/actions/cohorte'
import { useSelector, useDispatch } from 'react-redux';
import { traerGrupoPmPorCohorte } from '../../redux/actions/pm';
import { groupPPbyPmId, getStudentsByGrouppId } from '../../redux/actions/pp';
import PairProgrammingStudent from './PairProgrammingStudent.js'
import AddStudents from './AddStudents'

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';



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
    paper: {
        padding: theme.spacing(2),
        margin: "10px",
        width: "30%",
        backgroundColor: "#FFFFDD"
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    accordion: {
        background: "rgb(177,34,143)",
        background: "linear-gradient(135deg, rgba(177,34,143,1) 0%, rgba(69,181,210,1) 100%)",
    },
    accordionDetails:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    students: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center"
    }
}))

export default function Pair_programming(){
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem("user"))
    const cohortes = useSelector(state => state.cohortes.data)
    const groupPMs = useSelector (state => state.pm.data)
    const groupsPP = useSelector(state => state.gruposPPByPmId.data)
    const studentsOfThisPp = useSelector(state => state.styudentsByPpId.data)
    const [option, setOption] = useState(0)
    const [cohortSelected, setCohortSelected] = useState(null)
    const [groupSelected, setGroupSelected] = useState(null)


    useEffect(() => {
        dispatch(getCohortes())
    }, [])
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
        setAnchorEl2(event.currentTarget)
        //El siguiente condicional se utiliza para poder identificar que boton es el que lo esta ejecutando para asi poder hacer la request al backend
        if(cohortSelected){
            dispatch(traerGrupoPmPorCohorte(cohortSelected.id))
        }
    }
    const handleClickCohort = (cohort) => {
        setCohortSelected(cohort)
        setOption(1)
        handleClose();
    }
    const handleClickGroupPM = (group) => {
        setGroupSelected(group)
        console.log(group)
        dispatch(groupPPbyPmId(group.groupPm.id))
        setOption(2)
    }
    const handleClose = () => {
        setAnchorEl(null);
        setAnchorEl2(null)
    };
    const getStudents = (id) => {
        dispatch(getStudentsByGrouppId(id))
    }
    console.log(groupsPP)
    return (
        <div className="main">
        {!user.admin?
            <PairProgrammingStudent/>:
        option >= 0 ?
            !cohortSelected ? 
            <div className="menuButton">
                <Button key={0} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    Seleccionar Cohorte
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {cohortes && cohortes.map(cohorte => {
                        return <MenuItem key={cohorte.id} onClick={() => handleClickCohort(cohorte)}>{cohorte.name}</MenuItem>
                    })}
                    
                </Menu>
            </div>:
            <div className="menuButton">
                <Button key={0} aria-controls="simple-menu" aria-haspopup="true" disabled>
                        {cohortSelected.name}
                </Button>
            </div>
            : null}
            {option >= 1?
            !groupSelected? 
            <div className="menuButton">
                <Button key={1} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    Seleccionar Grupo de PM
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl2}
                    keepMounted
                    open={Boolean(anchorEl2)}
                    onClose={handleClose}
                >
                    {groupPMs && groupPMs.map(grupo => {
                        {/* return console.log(cohorte) */}
                        return <MenuItem key={grupo.groupPm.id} onClick={() => handleClickGroupPM(grupo)}>{grupo.groupPm.name}</MenuItem>
                    })}
                    
                </Menu>
            </div>:
            <div className="menuButton">
                <Button disabled key={1} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    Seleccionar Grupo de PM
                </Button>
            </div>
            : null}
            {option == 2 ?
            <div>
            {groupsPP && groupsPP.map( group => (
                <Accordion className={classes.accordion} key={group.id}>
                    <AccordionSummary
                        onClick={() => getStudents(group.id)}
                        expandIcon={<ExpandMoreIcon style={{ color: "black" }} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading} style={{ color: "black" }} >{group.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.accordionDetails}>
                        <AddStudents data={group}/>
                        <div className={classes.students}>
                        {studentsOfThisPp && studentsOfThisPp.map(alumno => (
                            <Paper key={alumno.id} className={classes.paper}>
                                <Grid container spacing={2}>
                                    <Grid item>
                                        <ButtonBase className={classes.image}>
                                            <img style={{ height: "70px", display: "flex", alignItems: "center" }} className={classes.img} alt="complex" src={alumno.user.image} />
                                        </ButtonBase>
                                    </Grid>
                                    <Grid item xs={12} sm container>
                                        <Grid item xs container direction="column" spacing={2}>
                                            <Grid item xs>
                                                <Typography gutterBottom variant="subtitle1" style={{ fontWeight: "bold", height: "30px" }}>
                                                    {alumno.user && alumno.user.name + " " + alumno.user.lastName}
                                                </Typography>
                                                <Typography variant="body2" gutterBottom style={{ fontWeight: "bold" }}>
                                                    Henry
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        ))}
                        </div>
                    </AccordionDetails>
                </Accordion>
            ))
            }
            </div>
            : null
        }

        </div>
    )
}
