import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button,Input} from '@material-ui/core/';
import { ExcelRenderer} from 'react-excel-renderer';
import Table from "./Table";

const useStyles = makeStyles((theme) => ({
  root: {
    padding:'32px',
    maxWidth:'1000px',
    maxWidthXs:'100%'
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
  
  input: {
    display: 'none',
  },
}));

export default function UploadButtons() {
  const classes = useStyles();

 
    const [state,setState]=useState({
      isOpen: false,
      dataLoaded: false,
      isFormInvalid: false,
      rows: null,
      
    })  
    const fileInput = React.createRef();
 

  const renderFile = (fileObj) => {
      //just pass the fileObj as parameter
      ExcelRenderer(fileObj, (err, resp) => {
        if(err){
          console.log(err);            
        }
        else{
          setState({
            dataLoaded: true,
            rows: resp.rows
          });
        }
      }); 
  }
 
  const fileHandler = (event) => {   
    
    if(event.target.files.length){
      let fileObj = event.target.files[0];
      let fileName = fileObj.name;

      
      //check for file extension and pass only if it is .xlsx and display error message otherwise
      if(fileName.slice(fileName.lastIndexOf('.')+1) === "xlsx"){
       setState({
          uploadedFileName: fileName,
          isFormInvalid: false
        });
        renderFile(fileObj)
      }    
      else{
        this.setState({
          isFormInvalid: true,
          uploadedFileName: ""
        })
      }
    }               
  }
 
  const openFileBrowser = () => {
    fileInput.current.click();
  }


  

  return (
    <div className={classes.root}>
      <input
        className={classes.input}
        id="contained-button-file"
        type="file"
        onChange={fileHandler} 
        ref={fileInput} 
        onClick={(event)=> { event.target.value = null }}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained"  onClick={openFileBrowser} className={classes.submit}>
          Upload
        </Button>
        <Input id="component-disabled" disabled value={state.uploadedFileName} />
      </label>
      {state.dataLoaded && <Table data={state.rows}/>} 
    </div>
  );
}