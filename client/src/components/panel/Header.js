import React ,{useState,useEffect} from 'react';
import store from '../../redux/store/index'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {setActiveOptionPanel} from '../../redux/actions/panel'

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
  const [user, setUser] = useState(null)
  const [value,setValue]=useState(0)

  const options=[
    ["opcion 1","opcion 2","opcion 3"],
    ["opcion a","opcion b","opcion c"],
    ["opcion x","opcion y","opcion z"]
  ]

    useEffect(()=> {
        setUser(store.getState().usuario.user)
    }, [])

  const location=useLocation();
  const url=location.pathname;

  const formatString =(string)=>{
    let noSpaces=string.replace("_"," ")
    let arr = noSpaces.split("")
    arr.shift()
    arr[0]=arr[0].toUpperCase()
    noSpaces=arr.join("")
    return(noSpaces)
}



const handleChange= (event, newValue)=>{
  setValue(newValue)
  dispatch(setActiveOptionPanel(value))
}

function tabValue(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

if(value!==null){
  console.log(value);
}

  return (
    <React.Fragment >
      <AppBar className={classes.root} position="relative" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
          <Typography color="inherit" variant="h5" component="h1" >
                {url !== "/"? formatString(url): "Home"}
              </Typography>
            <Hidden smUp>
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
              <Tooltip title="Alerts • No alerts">
                <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <IconButton color="inherit" className={classes.iconButtonAvatar}>
                <Avatar src={user && user.image} alt="My Avatar" />
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

          <Tab textColor="inherit" label="Información" {...tabValue(0)}/>
          <Tab textColor="inherit" label="Sign-in method" {...tabValue(1)}/>
          <Tab textColor="inherit" label="Templates" {...tabValue(2)}/>
          <Tab textColor="inherit" label="Usage" {...tabValue(3)}/>
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