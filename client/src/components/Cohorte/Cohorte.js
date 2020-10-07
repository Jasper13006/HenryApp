import React, { useEffect } from 'react'
import store from '../../redux/store/index'
import { getCohorteUser, getLinkVideos } from '../../redux/actions/cohorte'
import { useSelector, useDispatch } from 'react-redux'
import CohorteAdmin from './Admin'
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
    const user = JSON.parse(localStorage.getItem("user"))
    const id = localStorage.getItem("idUser")

    useEffect(()=> {
        if(!user.admin){
            dispatch(getCohorteUser(id))
            dispatch(getLinkVideos(id))
        }    
    }, [])
    const perteneceAUnCohorte= () =>{
        if(cohorte) return true
        return (
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "No eres parte de ningun cohorte",
            }),
            setTimeout(() => {
                window.location.assign("http://localhost:3000/panel")
            }, 800)
        )
    }

    const handleClickLink = (e) => {
        e.preventDefault();
        window.location = (`${e.target.name}`)
    }
    return (
        <div className={classes.root}>
        {
        user.admin?
        <div>
            <CohorteAdmin/>
        </div>
        :
        perteneceAUnCohorte() && !option?
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
                                return <li><a target="_blank" href={modulo.linkVideos} ><Link name={modulo.linkVideos} variant="body2" >{modulo.nameClass}</Link></a></li>
                            })
                        }
                    </ul>
                </div>
            </div> :
        perteneceAUnCohorte() && option === 1 && 
            <Compañeros cohorte={cohorte? cohorte : null}/>
        }
        </div>
        )
}