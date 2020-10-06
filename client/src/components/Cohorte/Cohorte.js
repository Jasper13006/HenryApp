import React, { useEffect } from 'react'
import store from '../../redux/store/index'
import { getCohorteUser, getLinkVideos } from '../../redux/actions/cohorte'
import { useSelector, useDispatch } from 'react-redux'
import './Cohorte.css'
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Compañeros from './Compañeros'
import Swal from 'sweetalert2'
import Link from '@material-ui/core/Link';



const useStyles = makeStyles((theme) => ({
        root: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        },
        paper: {
            width: "100%",
            padding: theme.spacing(2),
            textAlign: 'center',
            color: "#512990",
            fontSize: "30px",
            margin: theme.spacing(1),
            marginLeft: "1px",
            backgroundColor: "#2f84af",
        },
        paper2: {
            width: "50%",
            display: "flex",
            marginLeft: "25%",
            backgroundColor: "#c8c8c8",
            justifyContent: "center",
            color: "grey",
            padding: theme.spacing(2),
            margin: theme.spacing(1),
        },
}));

export default function Cohorte(){
    const classes = useStyles();
    const dispatch = useDispatch()
    const option = useSelector(state=>state.panel.data)
    const cohorte = useSelector(state => state.getCohorteUser.data)
    const modulos = useSelector(state => state.modulos.data)

    useEffect(()=> {
        const id = localStorage.getItem("idUser")
        dispatch(getCohorteUser(id))
        dispatch(getLinkVideos(id))
    }, [])
    console.log(modulos)

    const handleClickLink = (e) => {
        e.preventDefault();
        window.location = (`${e.target.name}`)
    }
    return (
        <div className={classes.root}>
        { 
        !option?
            <div className={classes.root}>
                <Hidden only="sm">
                    <Paper className={classes.paper}>¤ {cohorte && cohorte.name} ¤</Paper>
                    <Paper className={classes.paper2}>Instructor: {cohorte && cohorte.instructor.name + " " + cohorte.instructor.lastName}</Paper>
                </Hidden>
                <div className="pizarron">
                    <h3 className="subtitulo">Clases Grabadas </h3>
                    <ul className="linksGenerales">
                        {
                            modulos && modulos.map(modulo => {
                                return <li><Link name={modulo.linkVideos} component="button" variant="body2" onClick={handleClickLink}>{modulo.nameClass}</Link></li>
                            })
                        }
                            {/* <li><a href="#">Clase1</a></li>
                            <li><a href="#">Clase2</a></li>
                            <li><a href="#">Clase3</a></li>
                            <li><a href="#">Clase4</a></li>
                            <li><a href="#">Clase5</a></li>
                            <li><a href="#">Clase6</a></li>
                            <li><a href="#">Clase7</a></li>
                            <li><a href="#">Clase8</a></li>
                            <li><a href="#">Clase9</a></li>
                            <li><a href="#">Clase10</a></li>
                            <li><a href="#">Clase1</a></li>
                            <li><a href="#">Clase2</a></li>
                            <li><a href="#">Clase3</a></li>
                            <li><a href="#">Clase4</a></li>
                            <li><a href="#">Clase5</a></li>
                            <li><a href="#">Clase6</a></li>
                            <li><a href="#">Clase7</a></li>
                            <li><a href="#">Clase8</a></li>
                            <li><a href="#">Clase9</a></li>
                            <li><a href="#">Clase10</a></li> */}
                                
                    </ul>
                </div>
            </div> :
        option === 1 && 
            <Compañeros cohorte={cohorte? cohorte : null}/>
        }
        </div>
        )
}