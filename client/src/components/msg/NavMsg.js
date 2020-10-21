import React from 'react';
import socket from './Socket'
import { makeStyles } from '@material-ui/core/styles';
import {Accordion,List,Badge,Alert} from '@material-ui/core/';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {useDispatch,useSelector} from 'react-redux'
import {getChats,getMsg,editChat} from '../../redux/actions/msg'
import { useHistory } from 'react-router-dom';
import store from '../../redux/store/index'



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom:'30px'   
    
  },
  accordion:{
    backgroundColor: 'rgba(255, 255, 255, 0.7);',
    display:'flex',
    flexDirection:'column'
  },
  submit: {
    color:'black',
    margin: '-9px',
    '&:hover': {
        color: 'yellow',
        backgroundColor:'transparent'
    }
    
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    
  },
  itemList:{
    display:'flex',
    backgroundColor: 'white',
    border: '1px solid',
    borderRadius: '10px',
    '&:hover': {
      color: 'yellow',
      backgroundColor:'black'
    },
    width:'100%'
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    position:'inherit'
  },
  headMsg:{
    display:'flex',
    alignItems:'baseline'
  }
  
}));

export default function NavMsg(props) {
  const history = useHistory()
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [chats,setChats] = React.useState([])
  const id = localStorage.getItem('idUser')
  const token = localStorage.getItem('token')
  const dispatch = useDispatch();
  

  // expande el menu 

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // direcciona al componente mensaje

  const handeClick = chat => {
    
    if(chat.from.id == id) {
      localStorage.setItem('toUser', JSON.stringify(chat.to));
    }else{
      localStorage.setItem('toUser', JSON.stringify(chat.from));
    }
    localStorage.setItem('chat',JSON.stringify(chat));
    dispatch(getMsg(chat.id,token))
    if(chat.from.id != id && !chat.check){
      dispatch(editChat(chat.id,token))  
    }    
    history.push('/panel/mensaje_directo')
  }

  React.useEffect(() => {
    dispatch(getChats(token))
    store.subscribe(() => {
      setChats(() => store.getState().msg.chats)
    }) 
      
  },[])

  React.useEffect(()=> {
    socket.on('getChats',chat => {
      console.log(chat)
      setChats(chat);
    })
    return () => {socket.off()}
  },[chats])

  return (
    <div className={classes.root}>
      <Accordion expanded={expanded === 'panel1'} className={classes.accordion} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          className={classes.headMsg}
        >
          <Typography className={classes.heading}>Mensajes Directos</Typography>
          <Link to ={`/panel/mensaje_usuario`}>
            <IconButton className={classes.submit} aria-label="add to shopping cart">
              <AddIcon />
            </IconButton>
          </Link>
          
        </AccordionSummary>
        <AccordionDetails>
          <List component="nav" aria-label="main mailbox folders">
          {chats.map((chat,key)=>(
            <ListItem button type='submit'key={key} onClick = {() => handeClick(chat)} className={classes.itemList}>
              <ListItemIcon>                    
                  <Avatar src={chat.from.id == id ? chat.to.image : chat.from.image} className={classes.small} style={{minWidth:'33px',minHeight:'33px'}}/>                    
              </ListItemIcon>
              <ListItemText >
                <span style={{fontSize: '0.85em'}}>
                  {chat.from.id == id ? chat.to.fullName : chat.from.fullName}
                </span>
              </ListItemText>
              {chat.from.id != id && !chat.check && <Badge badgeContent={1} color="secondary" style={{position:'initial'}}/>}                   
            </ListItem>                
          ))} 
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}