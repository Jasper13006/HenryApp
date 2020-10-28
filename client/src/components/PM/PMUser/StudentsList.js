import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import MessageIcon from '@material-ui/icons/Message';
import { traerGrupoPm } from '../../../redux/actions/pm';
import { useDispatch, useSelector } from 'react-redux';
import {getMsg,deleteMsgs} from '../../../redux/actions/msg'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: "10px",
        width: "100%",
        backgroundColor: "#FFFFDD"
    },
    image: {

    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

export default function ComplexGrid(props) {
    const classes = useStyles();
    const students = useSelector(state => state.groupPm.data && state.groupPm.data.students)
    const dispatch = useDispatch();      
    const chats = useSelector(state => state.msg.chats)
    const token = localStorage.getItem('token')
    const history = useHistory();
    const userId = localStorage.getItem("idUser")  
   

    useEffect(() => {
        dispatch(traerGrupoPm(props.id))
    }, [])

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
        history.push('/panel/mensaje_directo')
    };

    console.log(students)
    return (
        <div className={classes.root}>
            {students && students.map((student) => (
                <Paper key={student.id} className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                            <img style={{ height: "70px", display: "flex", alignItems: "center" }} className={classes.img} alt="complex" src={student.user.image} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1" style={{ fontWeight: "bold", height: "30px" }}>
                                    {student.user && student.user.name + " " + student.user.lastName}
                                </Typography>
                                <Typography variant="body2" gutterBottom style={{ fontWeight: "bold" }}>
                                    {student.user.email}
                  </Typography>

                            </Grid>
                            <Grid item>
                            </Grid>
                        </Grid>
                        <Grid item>                                                  
                            {student.user.id != userId ? <Typography variant="subtitle1" style={{ display: "flex", marginTop: "25px", cursor: "pointer" }} >
                                <MessageIcon onClick={()=>handleClick(student.user)}/>
                            </Typography> : null}
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>))}

        </div>
    );
}
