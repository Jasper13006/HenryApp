import React, {useState}from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import EditIcon from '@material-ui/icons/Edit'
import { DialogTitle, FormControl, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {useDispatch} from 'react-redux'
import { changeUserData } from '../../redux/actions/user'
import {update} from '../../redux/actions/update'
import './Perfil.css'
import useFetch from './hooks/useFetch'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

const useStyles = makeStyles(() => ({
  root: {
      padding:'30px',
      marginLeft:'30%',
      display:'flex',
  },
  upload:{
    width: '80%',
    margin: 'auto',
  },
  addInfoButton:{
    backgroundColor:'yellow',
    color:'black',
    '&:hover': {
        backgroundColor: 'black',
        color: 'yellow'
    },
    githubEdit:{
        display:'flex',
        flexDirection:'row',
    },
},
}));

export default function GitHubDialog({red,data,user,token}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false)  
  const [value, setValue] = useState(null)
  const [verifyGitHub, setVerifyGitHub] = useState(false)
  const dispatch=useDispatch()

  const getGitHubUser=useFetch('https://api.github.com/users/')
 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange=async(e)=>{
    setValue(e.target.value)
    if(red==="GitHub"){
      let gh = await getGitHubUser(e.target.value)
      if(gh){
        if(gh.login){
          setVerifyGitHub(true)
        }
        else{
          setVerifyGitHub(false)
        }
      }
    }
  }

  const handleSubmit=(e)=>{
    if(!value){
      return(false)
    }
    let data={}
    if(red==="GitHub"){
      data = {
        gitHubId: value
      }
    }
    else if(red==="LinkedIn"){
      data = {
        googleId: value
      }
    }
    if(data.gitHubId || data.googleId){
      dispatch(changeUserData(data,user.id,token))
      setTimeout(()=>{
        dispatch(update())
      },1000)
    }
    
    
    handleClose()
  }
  
  return (
    <div>
    <>
    <Button onClick={handleClickOpen} className={classes.addInfoButton} size="small">Agregar</Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" className={classes.root}>
      <FormControl>
        <DialogContent>
            <DialogTitle>Agregar Usuario de {red}</DialogTitle>
              <TextField 
                label={"Usuario de "+red}
                variant="outlined"
                name="github"
                onChange={handleInputChange}
                defaultValue=""
              />
              {verifyGitHub && <VerifiedUserIcon fontSize='large' color='primary'/>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary" disabled={!verifyGitHub && red==="GitHub"}>
            Actualizar
          </Button>
        </DialogActions>
        </FormControl>
      </Dialog>
      </>
    </div>
  );
}