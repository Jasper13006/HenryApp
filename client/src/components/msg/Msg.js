import React, { useEffect } from 'react';
import socket from './Socket'
import {
  fade,
  withStyles,
  makeStyles,
} from '@material-ui/core/styles';
import {InputBase,IconButton,Box,Avatar,Typography,ListItemText,ListItemIcon,ListItem,List} from '@material-ui/core/';
import FormControl from '@material-ui/core/FormControl';
import SendIcon from '@material-ui/icons/Send';
import Picker from 'emoji-picker-react';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import {useDispatch,useSelector} from 'react-redux'
import {addMsg,getMsg,editValidate,addSocket} from '../../redux/actions/msg';
import store from '../../redux/store/index'


 
const scrollType = {
  duration: 500,
  delay: 50,
  smooth: true, // linear “easeInQuint” “easeOutCubic” 
  offset: -10,
};

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: '100%',
    display:'flex',
    height: '27px',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
    ].join(','),
    
  },
}))(InputBase);


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent:'center'
               
    },
         
    submit: {
      marginTop: '30px',
      color:'gray',    
    },
    box:{
        borderBottom:'1px solid gray',
        backgroundColor: 'white',  
        width:'100%', 
        height:'auto',
        display:'flex',
        padding:'20px',
        alignItems:'center'
    },
    boxItem:{
      background:'linear-gradient(135deg, #fdeb71 0%,#f8d800 100%)',
      borderRadius:'20px',
      width:'90%',
      height:'auto',
      display:'flex',
      padding:'20px',
      alignItems:'center',
      borderBottom:'1px solid gray',
    },

    boxMsg:{
      borderBottom:'1px solid gray',
      backgroundColor: 'white',  
      width:'81%', 
      height:'53vh',
      display:'flex',
      flexDirection:'column',
      padding:'20px',
      position: 'absolute',
      top: '10.6em',
      overflowY:'scroll',
      scrollBehavior: 'smooth',
    
      
    },

    boxInput:{
      width:'90%',
      height:'13vh',
      border:'1px solid gray',
      borderRadius:'10px',
      backgroundColor: 'white',
      marginTop:'27em',
      marginLeft:'auto',
      marginRight:'auto',
      marginBottom:'30px',
      display:'flex',
      flexDirection:'column',
      position:'sticky'
      
    },
    
    input:{
      width:'100%',
      height:'5px',
      
    },
    boxEmoji:{
      width: '225px',
      height: '283px',
      marginLeft: '46em',
      marginTop: '4.3em',
      position:'absolute'
    },
    small: {
      width: theme.spacing(8),
      height: theme.spacing(8),
      position:'inherit',
      marginRight:'30px'
    },
    name:{    
      fontSize: '14px',
      fontWeight: 'bold'
    },
    boxDate:{
      display:'flex',
      justifyContent:'center',
      width:'147px;',
      padding:'auto',
      padding:'13px;',
      borderRadius: '10px',
      borderColor: 'black;',
      border: '1px solid',
      backgroundColor:'black',
      color:'yellow'
      
    }
    
}));





export default function Msg(props) {
    const classes = useStyles();
    const [description,setDescription] = React.useState('')
    const [open, setOpen] = React.useState(false);
    const userTo = JSON.parse(localStorage.getItem('toUser'))
    const userFrom = JSON.parse(localStorage.getItem('user'))
    const token = localStorage.getItem('token')
    const chat = JSON.parse(localStorage.getItem('chat'))
    const chats = useSelector(state => state.msg.chats)
    const dispatch = useDispatch()
    /* const mensajes = useSelector(state => state.msg.mensajes) */
    const [mensajes,setMensajes] = React.useState(store.getState().msg.mensajes) 
    const date = new Date()
    
    

    // abre y cierra la ventana de emojis

    const handleClickOpen = () => {
      setOpen(!open);
    };

    // setea al mensaje el emoji seleccionado 

    const onEmojiClick = (event, emojiObject) => {
      setDescription(description.concat(emojiObject.emoji))
    };

    // setea el texto al mensaje 

    const handleChange = event => {
      event.preventDefault()
      setDescription(event.target.value); 
    };

    // guarda el mensaje en bd y store de redux

    const handleSendMsg = event => {
      event.preventDefault()
      setOpen(false);
      const data = {
        description:description,
        toId:userTo.id,        
        to:userTo,
        from:userFrom,
        updatedAt:date.toISOString()        
      }
      if(data.description){
        dispatch(addMsg(data,token))
        socket.emit('mensaje',data)
        
      }
      setDescription('')
      

    }

    useEffect(()=>{
        if(!mensajes.length && chat){
          dispatch(getMsg(chat.id,token))
          dispatch(editValidate())
        } 
        store.subscribe(() => {
          setMensajes(() => store.getState().msg.mensajes)
        })        
                  
    },[])

    // conexion en tiempo real con socket io
    
    useEffect(()=> {
      console.log('hola')
      socket.on('mensajes',mensaje => {
        dispatch(addSocket(mensaje))
        setMensajes([...mensajes,mensaje])
        
      })
      return () => {socket.off()}
    },[mensajes])

    const divRef = React.useRef(null);
    
    useEffect(()=>{
      divRef.current.scrollIntoView({behavior:'smooth'})
    })
    // modificamos la fecha y la validamos

    const changeDate = (updatedAt,validate) => {
      const fecha = new Date(updatedAt)
      if(validate && fecha.toDateString() === date.toDateString()){
        return 'Hoy';        
      }else if(validate){
        return fecha.toDateString();
      }
      return fecha.toTimeString().split('G')[0];  
    }

    return (    
    <div className={classes.root} >
      <Box className={classes.boxMsg}>
          <Box className={classes.box} >
            <Avatar src={userTo.image} className={classes.small} />
            <Box>
              <Typography component="h1" variant="h5">
                  {userTo.fullName}
              </Typography>
              <Typography  component='h5' >
                  Este es el inicio de tu conversacion con {userTo.fullName}
              </Typography>
            </Box>
            
          </Box>
          <List component="nav" aria-label="main mailbox folders">
            {mensajes.map((msg,key,elements)=>(
                <ListItem key={key} style={{display:'flex',flexDirection:'Column'}} >
                  {!key && <Box className = {classes.boxDate} >
                    <Typography className={classes.name} variant="h5">
                        {changeDate(msg.updatedAt,true)}
                    </Typography>
                  </Box> }
                  {key && msg.updatedAt.split('T')[0] !== elements[key-1].updatedAt.split('T')[0] ? <Box className = {classes.boxDate}>
                    <Typography className={classes.name} variant="h5">
                      {changeDate(msg.updatedAt,true)}
                    </Typography>
                  </Box> : null} 
                    <Box 
                      className={classes.boxItem} 
                      style = {msg.from.id !== userFrom.id ? {background:'linear-gradient(135deg, #ddffff 0%,#74abbe 100%)'} : null} 
                                            
                    >
                      <ListItemIcon>
                      <div className={classes.root}>
                          <Avatar src={msg.from.image} className={classes.small} />
                          </div>
                      </ListItemIcon>
                      <div >
                        <Typography className={classes.name}>
                          {msg.from.fullName}
                        </Typography>
                        <Typography style={{fontSize: '0.8em',color: 'darkgray'}}>
                          {changeDate(msg.updatedAt,false)}
                        </Typography>                     
                        <ListItemText primary={msg.description} />
                      </div>     
                    </Box>                                                                                
                </ListItem>
            ))}
          </List> 
          <div ref={divRef}></div>   
        </Box>
        
        {open && 
          <Box className={classes.boxEmoji}>
            <Picker onEmojiClick={onEmojiClick} className={classes.boxEmoji} disableSkinTonePicker='false'/>
        </Box>} 
        <Box className={classes.boxInput}>
            <form onSubmit={handleSendMsg}>                         
                <FormControl className={classes.input}>
                    <BootstrapInput placeholder="Escribe tu mensaje" id="bootstrap-input" value={description} autoComplete='off' onChange={handleChange} />
                </FormControl>                   
            </form>
            <div style={{marginLeft:'auto'}}>
              <IconButton className={classes.submit} onClick={handleClickOpen} aria-label="add to shopping cart">
                  <InsertEmoticonIcon/>
              </IconButton>
              <IconButton className={classes.submit} type='submit' onClick={handleSendMsg} aria-label="add to shopping cart">
                  <SendIcon/>
              </IconButton>     
            </div>                    
        </Box> 
    </div>
    
    
    
  );
}