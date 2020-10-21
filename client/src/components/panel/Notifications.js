import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import {MenuItem,Badge,IconButton} from '@material-ui/core/';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {useDispatch,useSelector} from 'react-redux'
import MessageIcon from '@material-ui/icons/Message';
import {getMsg,editChat,editValidate} from '../../redux/actions/msg'
import { useHistory } from 'react-router-dom';

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
    const [anchorEl, setAnchorEl] = React.useState(null);
    const id = localStorage.getItem('idUser')
    const token = localStorage.getItem('token')
    const [quantity,setQuantity] = React.useState(0)
    const validate = useSelector(state => state.msg.validate)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    React.useEffect(() => {
        let sum = 0   
        if(chats.length && validate){
          chats.map((chat) => {
              if(chat.from.id != id && !chat.check){
                sum++;
              }
          })
          setQuantity(sum)
          dispatch(editValidate())
        }            
    })
    const handeSend = chat => {
        
        if(chat.from.id == id) {
        localStorage.setItem('toUser', JSON.stringify(chat.to));
        }else{
        localStorage.setItem('toUser', JSON.stringify(chat.from));
        }
        localStorage.setItem('chat',JSON.stringify(chat));
        dispatch(getMsg(chat.id,token))
        setAnchorEl(null);
        if(chat.from.id != id && !chat.check){
          dispatch(editChat(chat.id,token))
        }
        history.push('/panel/mensaje_directo')

    }

  return (
    <div>
        <IconButton aria-label="show 11 new notifications" color="inherit" onClick={handleClick}>
          <Badge badgeContent={quantity} color="secondary">
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
            {chats.length && quantity ? chats.map((chat)=> (
                <StyledMenuItem onClick = {() => handeSend(chat)}>
                    <span style={{fontSize: '0.85em'}}>
                        <MessageIcon/>
                        {chat.from.id == id ? chat.to.fullName : chat.from.fullName}
                    </span>
                </StyledMenuItem>
            )) : null}
          {!quantity ? <StyledMenuItem>
                <span style={{fontSize: '0.85em'}}>
                    <MessageIcon/>
                    No tienes mensajes nuevos
                </span>
            </StyledMenuItem> : null }
        </StyledMenu>
    </div>
  );
}