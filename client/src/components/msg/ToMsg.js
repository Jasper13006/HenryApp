import React from 'react';
import {
  fade,
  withStyles,
  makeStyles,
} from '@material-ui/core/styles';
import {InputBase,Button} from '@material-ui/core/';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {getMsg,deleteMsgs} from '../../redux/actions/msg'




const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
    ].join(','),
    '&:focus': {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase);


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    search:{
        display:'flex',
        flexDirection:'column'
    },
    margin: {
        margin: theme.spacing(2),
    },
    marginMsg:{
        margin: theme.spacing(2),
        marginLeft: '132px;',
        maxWidth: '500px'
    },
    list:{
        display:'flex'
    },
    listItem:{
        display:'flex'
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        position:'inherit'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor:'yellow',
        color:'black',
        '&:hover': {
            backgroundColor: 'black',
            color: 'yellow'
        }    
    },
}));



export default function ToMsg(props) {
    const dispatch = useDispatch()
    const classes = useStyles();
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    const chats = useSelector(state => state.msg.chats)
    const [users,setUsers] = React.useState()
    const token = localStorage.getItem('token')
    const userFrom = JSON.parse(localStorage.getItem('user'))

    /// seteo los datos que voy ingresando en el input
    const handleChange = event => {
        
        event.preventDefault()
        setSearchTerm(event.target.value); 
    };

    // selecciono el usuario al que se le envia el msg
    const handleClick = user => { 
        let validate = true;
        chats.map((chat) => {
            if(chat.from.id === user.id || chat.to.id === user.id){
                dispatch(getMsg(chat.id,token))
                validate = false
            }

        })
        if(validate){
            dispatch(deleteMsgs())
            localStorage.removeItem('chat');
        }
        localStorage.setItem('toUser', JSON.stringify(user));       
        props.history.push('/panel/mensaje_directo')
    };

    React.useEffect(() => {

        // traigo todos los usuarios
        Axios.get('http://localhost:3001/user') 
        .then((res)=> {
            setUsers(res.data)
        }).catch(err => console.log(err))
    },[])
    React.useEffect(() => {

        // si escribo algo en el input, filtro los usuarios
        if(searchTerm){
            const results = users.filter(user => {
                if(user.id !== userFrom.id){
                    return user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
                }    
            });
            setSearchResults(results.splice(0,5));
        }  
        else{
            setSearchResults([]);
        }
    }, [searchTerm]);
  
    return (    
    <form className={classes.root} noValidate>  
    <div className={classes.search}>
        <FormControl className={classes.margin}>
            <InputLabel shrink htmlFor="bootstrap-input" >
                Para:
            </InputLabel>
            <BootstrapInput placeholder="Escribe un nombre" id="bootstrap-input" autoComplete='off' value={searchTerm} onChange={handleChange} />
        </FormControl>
        <div className={classes.root}>
            {searchResults.map((user,key)=>(
                <ListItem button type='submit' onClick={() => handleClick(user)} key={key}>
                    <ListItemIcon>
                    <div className={classes.root}>
                        <Avatar src={user.image} className={classes.small} />
                        </div>
                    </ListItemIcon>
                    <ListItemText primary={user.fullName} />
                </ListItem>
            ))}       
        </div>
    </div>         
    
    </form>
    
    
  );
}