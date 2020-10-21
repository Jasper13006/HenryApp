import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import store from '../../redux/store/index'
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import { Link, useLocation } from 'react-router-dom';
import users from '../../redux/reducers/getUsers';
import NavMsg from '../msg/NavMsg'


const studentOptions= ["perfil","cohorte","PM","pair_programming","notas"]
const modules=["Módulo 1","Módulo 2","Módulo 3","Módulo 4"]
const adminOptions=["perfil","cohorte","PM","calificar","invitacion"]


const styles = (theme) => ({
    categoryHeader: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    categoryHeaderPrimary: {
        color: theme.palette.common.white,
    },
    item: {
        paddingTop: 1,
        paddingBottom: 1,
        color: 'rgba(255, 255, 255, 0.7)',
    },
    itemCategory: {
        boxShadow: '0 -1px 0 #404854 inset',
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    firebase: {
        fontSize: 24,
        color: theme.palette.common.white,
    },
    itemActiveItem: {
        color: '#4fc3f7',
    },
    itemPrimary: {
        fontSize: 'inherit',
    },
    itemIcon: {
        minWidth: 'auto',
        marginRight: theme.spacing(2),
    },
    divider: {
        marginTop: theme.spacing(2), 
    },

});

function Navigator(props) {
    const { classes, ...other } = props;
    const location=useLocation();
    const url=location.pathname;
    const user = JSON.parse(localStorage.getItem('user'))

    const formatString =(string)=>{
        let noSpaces=string.replace("_"," ")
        let arr = noSpaces.split("")
        arr[0]=arr[0].toUpperCase()
        noSpaces=arr.join("")
        return(noSpaces)
    }

    useEffect(()=> {
    }, [])
    
    return (
        <Drawer variant="permanent" {...other}>
        <List  disablePadding>
            <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
            Henry App
            </ListItem>
            <Link to="/panel">
                <ListItem className={clsx(classes.item, classes.itemCategory)}>
                    <ListItemIcon className={classes.itemIcon}>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText classes={{primary: classes.itemPrimary,}}>
                        Calendario
                    </ListItemText>
                </ListItem>
            </Link>
            <ListItem className={classes.categoryHeader}>
                <ListItemText classes={{primary: classes.categoryHeaderPrimary,}}>
                    {user && user.name + " " + user.lastName}
                </ListItemText>
                </ListItem>
                
                {user && !user.admin? studentOptions.map((opcion,i)=>
                <ListItem key={i}>
                    <Link to ={`/panel/${opcion}`}>
                        <ListItemText 
                            className={clsx(classes.item, url === `/panel/${opcion}`? classes.itemActiveItem:null)} >
                                {formatString(`${opcion}`)}
                        </ListItemText>   
                    </Link>
                </ListItem>)
                :
                user && user.admin === true && adminOptions.map((opcion,i)=>
                <ListItem key={i}>
                    <Link to ={`/panel/${opcion}`}>
                        <ListItemText 
                            className={clsx(classes.item, url === `/panel/${opcion}`? classes.itemActiveItem:null)} >
                                {formatString(`${opcion}`)}
                        </ListItemText>   
                    </Link>
                </ListItem>)
                }
                <NavMsg/>
        </List>
        </Drawer>
    );
}

Navigator.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);