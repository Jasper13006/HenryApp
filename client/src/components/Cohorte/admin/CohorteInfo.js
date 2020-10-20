import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getLinkVideos } from '../../../redux/actions/cohorte';
import { getStudent } from '../../../redux/actions/user';
import { agregarClase } from '../../../redux/actions/modulos'

//imports de material UI
import Swal from 'sweetalert2';
import MaterialTable from 'material-table';
import Dialog from '@material-ui/core/Dialog';
import Fab from '@material-ui/core/Fab';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl } from '@material-ui/core'
import { Link } from 'react-router-dom'


const useStyles = makeStyles(() => ({
    addIcon: {
        display: "flex",
        width: "50px",
        height: "50px",
        borderRadius: "50px",
        backgroundColor: "black",
        color: "white",
    },
    Link: {
        display: "flex", 
        margin: "30px",
        justifyContent: "center",
        borderRadius: "15px",
        alignItems: "center",
        color: "black",
        width: "150px", 
        height: "70px",
        background: "radial-gradient(circle, rgba(203,203,203,1) 0%, rgba(233,223,148,0.37718837535014005) 100%)"
    }
}))

export default function CohorteInfo(cohorte){
    const classes = useStyles()
    const dispatch = useDispatch()  
    const [open, setOpen] = useState(false)
    const moduleType= ['1 - JS Foundations', '2 - Frontend', '3 - Backend', '4 - Base de datos', '5 - Henrylabs']
    const modulos = useSelector(state => state.modulos.data)
    const[active, setActive] = useState(false)
    const id = parseInt(localStorage.getItem("idUser"))
    const [dataEditTable, setDataEditTable] = useState(false)
    const columnsEditTable = [{
        title: "Modulos", field: "modulos",
        lookup: { 1: 'JS Foundations', 2: 'Frontend', 3: "Backend", 4: "Base de datos", 5: "Henrylabs" },
        },
        {
        title: "Name", field: "name",
        },
        {title: "Link", field: "link"},
        {title: "description", field: "description"}
    ]

    useEffect(() =>{
        var videos = []
        modulos && modulos.map(modulo => {
            return videos.push({ modulos:parseInt( modulo.name[0]), name: modulo.nameClass, link: <Link color="primary" onClick={() => window.open(modulo.linkVideos)}>link</Link>, description: modulo.description})
        })
        setActive(true)
        setDataEditTable(videos)
    }, [modulos])

    const handleClickOpen = async() => {
        await dispatch(getLinkVideos(cohorte.data.id))
        setOpen(true);
        console.log(cohorte.data.id)
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = (data) => {
        console.log(data)
        // handleClose()
        const newModule = {name: moduleType[parseInt(data.modulos)-1], nameClass: data.name, description: data.description, linkVideos: data.link, cohorteId: cohorte.data.id}
        const newClass = { modulos:parseInt( data.name[0]), name: data.nameClass, link: <Link color="primary" onClick={() => window.open(data.linkVideos)}>link</Link>, description: data.description}
        dispatch(agregarClase(newModule))
    }

    return (

        <div>
            <Fab onClick={handleClickOpen} color="black" className={classes.addIcon}>
                <ImportContactsIcon/>
            </Fab>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <FormControl>
                    <MaterialTable            
                    title="Modulos"
                    columns={columnsEditTable}
                    data={dataEditTable && dataEditTable}
                    editable={{
                    onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                        resolve();
                        setDataEditTable((prevState) => {
                            const data = [...prevState]
                            newData.link = <Link color="primary" onClick={() => window.open(newData.link)}>link</Link>
                            data.push(newData);
                            return data
                        })
                        }, 600);
                        handleAdd(newData)
                    }),
                    }}
            />
                </FormControl>
            </Dialog>
        </div>
    )
}