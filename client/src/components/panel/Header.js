import React, { useState, useEffect } from 'react';
import store from '../../redux/store/index'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined'
// import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import {Tab,Badge} from '@material-ui/core/';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';
import Notifications from './Notifications'
import { useDispatch } from 'react-redux';
import { setActiveOptionPanel } from '../../redux/actions/panel'
import Swal from 'sweetalert2'


const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = (theme) => ({
  secondaryBar: {
    zIndex: 0,
  },
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  iconButtonAvatar: {
    padding: 4,
    height: "100px"
  },
  link: {
    textDecoration: 'none',
    color: lightColor,
    '&:hover': {
      color: theme.palette.common.white,
    },
  },
  button: {
    borderColor: lightColor,
  },
  root: {
    backgroundColor: "#ffff77",
    color: "black",
  }
});

function Header(props) {
  const dispatch = useDispatch()
  const { classes, onDrawerToggle } = props;
  const user = JSON.parse(localStorage.getItem('user'))
  const [value, setValue] = useState(0)

  //En este objeto colocar los nombres de las opciones para cada ruta del panel
  const options={

    "/panel/perfil":["Datos Personales","Cambiar contraseña","Configuración"],
    "/panel/cohorte":["Cohorte","Alumnos"],
    "/panel/PM":["Anuncios","Chat"],
    "/panel/pair_programming":["Feedback","Evaluar"],
    "/panel/notas":["Resumen de Notas"],
    "/panel/invitacion":["Individual",'Hoja excel'],
    "/panel/calificar":["Individual",'Consultar','Múltiple'],
  }



  const location = useLocation();
  const url = location.pathname;


  const formatString =(string)=>{
    let noSpaces=string.replace("_"," ")
    noSpaces=noSpaces.replace("/panel","")
    noSpaces=noSpaces.replace("/","")
    let arr = noSpaces.split("")
    if(arr.length>0){
      arr[0]=arr[0].toUpperCase()
    noSpaces=arr.join("")
    }
    return(noSpaces)
}



  const handleChange = (event, newValue) => {
    setValue(newValue)
    dispatch(setActiveOptionPanel(newValue))
  }
  const handleLogOut = () => {
    localStorage.clear()
    window.location.assign("http://localhost:3000")
    Swal.fire({
      icon: 'success',
      title: 'Vuelva pronto!',
    })
  }


function tabValue(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

  return (
    <React.Fragment >
      <AppBar className={classes.root} position="relative" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Typography color="inherit" variant="h5" component="h1" >
              {url !== "/" ? formatString(url) : "Home"}
            </Typography>
            <Hidden mdUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={onDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item xs />
            <Grid item> 
              <Notifications/>                           
            </Grid>
            <Grid item>
              <IconButton color="inherit" className={classes.iconButtonAvatar}>
                <Avatar src={user && user.image} alt="My Avatar" />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton color="inherit">
                <ExitToAppOutlinedIcon onClick={handleLogOut}/>
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className={classes.root}
        position="static"
        elevation={0}
      >
        <Tabs value={value} textColor="inherit" onChange={handleChange} aria-label="simple tabs example">
          {options[url] ?
            options[url].map((option, index) =>
              <Tab textColor="inherit" key={index} label={option} {...tabValue(index)} />
            )
            : null}
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);