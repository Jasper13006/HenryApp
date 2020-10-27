import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import {MenuItem,Badge,IconButton} from '@material-ui/core/';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {useDispatch,useSelector} from 'react-redux'
import MessageIcon from '@material-ui/icons/Message';
import {getMsg,editChat,addChatNot,removeChatNot} from '../../redux/actions/msg'
import { useHistory } from 'react-router-dom';
import socket from '../msg/Socket'
import store from '../../redux/store/index'


const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={1}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    
  },
}))(MenuItem);

export default function CustomizedMenus() {
    const history=useHistory()
    const dispatch = useDispatch()
    const chats = useSelector(state => state.msg.chats);
    /* const [chats,setChats] = React.useState([]) */
    const [anchorEl, setAnchorEl] = useState(null);
    const id = localStorage.getItem('idUser')
    const token = localStorage.getItem('token')
    const [chatsNotification,setChatNotification] = useState(store.getState().msg.chatsNotification)

    const handleClick = (event) => {

        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    React.useEffect(() => {
      if(!chatsNotification.length && chats){
        chats.map((chat) => {
          if(!chat.check && chat.from.id != id){
            setChatNotification([...chatsNotification,chat])
          }
        })
        store.subscribe(() =>{
          setChatNotification(() => store.getState().msg.chatsNotification)
        })
      }   
    })

    /// conexion con socket

    React.useEffect(() => {
      
      socket.on('notification', chat => {        
        /* const filt = chats.filter(chatS => chatS.id == chat.id)         
        if(!filt.length){
          dispatch(addChatSocket(chat))
          setChats([...chats,chat])
          
        } */   
        dispatch(addChatNot(chat)) 
        setChatNotification([...chatsNotification,chat])     
      })
      return () => {socket.off()}
    })

    const handeSend = chat => {
        /* var i = chatsNotification.indexOf( chat );
        chatsNotification.splice( i, 1 ); */
        dispatch(removeChatNot(chat))
        if(chat.from.id == id) {
          localStorage.setItem('toUser', JSON.stringify(chat.to));
        }else{
          localStorage.setItem('toUser', JSON.stringify(chat.from));
        }

        localStorage.setItem('chat',JSON.stringify(chat));
        dispatch(getMsg(chat.id,token))
        setAnchorEl(null);
        if(!chat.check){
          dispatch(editChat(chat.id,token))
        }
        history.push('/panel/mensaje_directo')

    }

  return (
    <div>
        <IconButton aria-label="show 11 new notifications" color="inherit" onClick={handleClick}>
          <Badge badgeContent={chatsNotification.length} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        >
            {chatsNotification.map((chat,key)=> (
                <StyledMenuItem onClick = {() => handeSend(chat)} key={key}>
                    <span style={{fontSize: '0.85em'}}>
                        <MessageIcon/>
                        {chat.from.id == id ? chat.to.fullName : chat.from.fullName}
                    </span>
                </StyledMenuItem>
            ))}
          {!chatsNotification.length ? <StyledMenuItem>
                <span style={{fontSize: '0.85em'}}>
                    <MessageIcon/>
                    No tienes mensajes nuevos
                </span>
            </StyledMenuItem> : null }
        </StyledMenu>
    </div>
  );
}