import React from 'react';
import {
  fade,
  withStyles,
  makeStyles,
} from '@material-ui/core/styles';
import {InputBase,IconButton,Box,Dialog,DialogContentText} from '@material-ui/core/';
import FormControl from '@material-ui/core/FormControl';
import SendIcon from '@material-ui/icons/Send';
import Picker from 'emoji-picker-react';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';






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
        height:'auto'
    },
    boxMsg:{
      borderBottom:'1px solid gray',
      backgroundColor: 'white',  
      width:'100%', 
      height:'80vh',
      display:'flex',
      flexDirection:'column'
    },

    boxInput:{
      width:'90%',
      height:'13vh',
      border:'1px solid gray',
      borderRadius:'10px',
      backgroundColor: 'white',
      marginTop:'auto',
      marginLeft:'auto',
      marginRight:'auto',
      marginBottom:'30px',
      display:'flex',
      flexDirection:'column'
      
    },
    
    input:{
      width:'100%',
      height:'5px',
      
    },
    boxEmoji:{
      width: '225px',
      height: '283px',
      marginLeft: 'auto',
      marginTop: '115px',
      marginRight:'98px'
    }
}));



export default function Msg(props) {
    const classes = useStyles();
    const [description,setDescription] = React.useState('')
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(!open);
    };


    const onEmojiClick = (event, emojiObject) => {
      setDescription(description.concat(emojiObject.emoji))
    };

    const handleChange = event => {
      event.preventDefault()
      setDescription(event.target.value); 
    };
    
    return (    
    <div className={classes.root} >
        <Box className={classes.box} >
            Mensaje
        </Box>
        <Box className={classes.box}>
            info
        </Box>
        <Box className={classes.boxMsg}>
          {open && 
          <div className={classes.boxEmoji}>
            <Picker onEmojiClick={onEmojiClick} className={classes.boxEmoji} disableSkinTonePicker='false'/>
          </div>}
          <Box className={classes.boxInput}>
            <form >                         
                <FormControl className={classes.input}>
                    <BootstrapInput placeholder="Escribe tu mensaje" id="bootstrap-input" value={description} autoComplete='off' onChange={handleChange} />
                </FormControl>                   
            </form>
            <div style={{marginLeft:'auto'}}>
              <IconButton className={classes.submit} onClick={handleClickOpen} aria-label="add to shopping cart">
                  <InsertEmoticonIcon/>
              </IconButton>
              <IconButton className={classes.submit} type='submit' aria-label="add to shopping cart">
                  <SendIcon/>
              </IconButton>
              
                  
            </div> 
                           
          </Box>
          
        </Box>
        
        
    </div>
    
    
    
  );
}