import React, { useEffect, useState } from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list';
import Swal from 'sweetalert2'
import './main.css'
import esLocale from '@fullcalendar/core/locales/es';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { createEvent, deleteEvent, modifyEvent } from '../../redux/actions/calendar'
import { getCohortes } from '../../redux/actions/cohorte'
import { useDispatch, useSelector } from "react-redux";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import { update } from '../../redux/actions/update'
import { getStudent } from '../../redux/actions/user'
import { INITIAL_EVENTS, createEventId } from './event-utils'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  inputlabel: {
    marginLeft: '5px',
    // color: 'black',
    fontSize: '130%',
  },
}));

export default function Calendar() {
  const [weekendsVisible, setWeekendsVisible] = useState(true)
  const [currentEvents, setCurrentEvents] = useState([]) //VARIABLE PARA GUARDAR TODOS LOS EVENTOS
  const [getEvents, setGetEvents] = useState()
  const dispatch = useDispatch()
  const classes = useStyles();
  const cohortes = useSelector(state => state.cohortes.data)
  const [cohorteId, setCohorteId] = useState()
  // const [update, setUpdate] = useState(0)
  const refresh = useSelector(state => state.update)
  const user = JSON.parse(localStorage.getItem("user"))
  const student = useSelector(state => state.student.data)

  useEffect(() => {
    if (!user.admin) {
      dispatch(getStudent(user.id))
    }
    dispatch(getCohortes())
    if (cohorteId) {
      fetch(`http://localhost:3001/calendar/${cohorteId}`)
        .then(res => res.json())
        .then(data => {
          setGetEvents(data)
        })
    }
  }, [cohorteId, refresh])

  useEffect(() => {
    if (student) {
      fetch(`http://localhost:3001/calendar/${student[0].cohorteId}`)
        .then(res => res.json())
        .then(data => {
          setGetEvents(data)
        })
      setCohorteId(student[0].cohorteId)
    }
  }, [student])

  const handleChangeCohorteId = (event) => {
    setCohorteId(event.target.value);
  };

  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible)
  }

  const handleDateSelect = async (selectInfo) => {
    let calendarApi = selectInfo.view.calendar
    calendarApi.unselect() // clear date selection
    let timestart = ''
    let timeend = ''
    let color = ''
    let url = ''
    let arrResult = []

    if (cohorteId) {
      await Swal.mixin({
        confirmButtonText: 'Siguiente &rarr;',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        progressSteps: ['1', '2', '3'],
      }).queue([
        {
          title: 'Titulo del evento',
          input: 'text',
          inputValidator: (result) => {
            return !result && 'Elegi un titulo para tu evento'
          }
        },
        {
          title: 'Tipo de evento',
          input: 'radio',
          inputOptions: {
            'Todo el dia': 'Todo el dia',
            'Horario': 'Horario',
          },
          inputValidator: (result) => {
            return !result && 'Debes seleccionar al menos una opcion'
          }
        },
        {
          title: 'Ajustes del evento',
          html: `
            <h5>Color del evento<h5>
            <select class="swal2-input" name="color" id="color">
              <option value="#3788D8" selected>Azul</option>
              <option value="#F76300">Naranja</option>
              <option value="red">Rojo</option>
              <option value="green">Verde</option>
              <option value="#58508D">Violeta</option>
            </select>
            <h5>Link (opcional)<h5>
            <input class="swal2-input" type="text" id="url">
            `,
          didOpen: () => {

            var colorinput = Swal.getContent().querySelector('#color')
            var urlinput = Swal.getContent().querySelector('#url')

            colorinput.addEventListener('change', () => {
              color = colorinput.value
            })

            urlinput.addEventListener('change', () => {
              url = urlinput.value
            })
          }
        }
      ]).then((result) => {
        arrResult = result
      })

      if (arrResult.value && arrResult.value.length !== 0) {
        if (arrResult.value[1] === 'Horario') {

          await Swal.fire({
            title: 'Selecciona el horario de tu nuevo evento',
            html: `
                <h5>Comienzo: </h5>
                  <input
                    type="time"
                    class="swal2-input"
                    id="startTime">
                    <h5>Fin: </h5>
                    <input
                    type="time"
                    id="endTime"
                    class="swal2-input"
                    >`,
            confirmButtonText: 'Crear evento',
            didOpen: () => {

              const startTime = Swal.getContent().querySelector('#startTime')
              const endTime = Swal.getContent().querySelector('#endTime')

              startTime.addEventListener('change', () => {
                timestart = startTime.value
              })

              endTime.addEventListener('change', () => {
                timeend = endTime.value
              })
            }
          })
        }
      }

      if (arrResult.value && arrResult.value.length > 0) {
        if (arrResult.value[1] === 'Todo el dia') {
          const evento = {
            title: arrResult.value[0],
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: true,
            url: url,
            color: color ? color : '#3788D8',
            userId: user.id,
            cohorteId: cohorteId
          }
          dispatch(createEvent(evento))
          // setUpdate(update + 1)
          setTimeout(() => {
            dispatch(update())
          }, 100)
        } else {
          if (timestart && timeend) {
            const evento = {
              title: arrResult.value[0],
              startRecur: selectInfo.startStr,
              endRecur: selectInfo.endStr,
              startTime: timestart,
              endTime: timeend,
              allDay: false,
              url: url,
              userId: user.id,
              cohorteId: cohorteId
            }
            dispatch(createEvent(evento))
            setTimeout(() => {
              dispatch(update())
            }, 100)
          }
        }
      }
    } else {
      Swal.fire(
        'Seleccione el cohorte donde desee crear el evento',
        '',
        'info'
      )
    }
  }

  const handleDragEvent = async (data) => {
    if (data.event.allDay) {
      const evento = {
        eventId: data.event._def.publicId,
        start: data.event.startStr,
        end: data.event.endStr,
      }
      await dispatch(modifyEvent(evento))
      setTimeout(() => {
        dispatch(update())
      }, 100)
    } else {
      const evento = {
        eventId: data.event._def.publicId,
        startRecur: data.event.startStr,
        endRecur: data.event.endStr,
        startTime: data.event.startStr.split('T')[1],
        endTime: data.event.endStr.split('T')[1],
      }
      await dispatch(modifyEvent(evento))
      setTimeout(() => {
        dispatch(update())
      }, 100)
    }
  }

  const editevent = async (data) => {
    var datos = [];
    await Swal.mixin({
      confirmButtonText: 'Siguiente &rarr;',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      progressSteps: ['1', '2']
    }).queue([
      {
        title: 'Titulo del evento',
        input: 'text',
        inputValue: data.event.title,
        inputValidator: (result) => {
          return !result && 'Elegi un titulo para tu evento'
        }
      },
      {
        title: 'Tipo de evento',
        input: 'radio',
        inputValue: data.event.allDay ? 'Todo el dia' : 'Horario',
        inputOptions: {
          'Todo el dia': 'Todo el dia',
          'Horario': 'Horario',
        },
        inputValidator: (result) => {
          return !result && 'Debes seleccionar al menos una opcion'
        }
      },
    ]).then((result) => {
      datos = result
    })

    if (datos.value && datos.value.length > 0) {
      if (datos.value[1] === 'Todo el dia') {
        const evento = {
          eventId: data.event._def.publicId,
          title: datos.value[0],
          allDay: true,
          cohorteId: cohorteId
        }
        dispatch(modifyEvent(evento))
        setTimeout(() => {
          dispatch(update())
        }, 100)
      } else {
        const evento = {
          eventId: data.event._def.publicId,
          title: datos.value[0],
          // startRecur: selectInfo.startStr,
          // endRecur: selectInfo.endStr,
          // startTime: timestart,
          // endTime: timeend,
          allDay: false,
          cohorteId: cohorteId
        }
        console.log(evento)
        dispatch(modifyEvent(evento))
        setTimeout(() => {
          dispatch(update())
        }, 100)
      }
    }
  }

  const handleEventClick = async (clickInfo) => {
    console.log(clickInfo)
    clickInfo.jsEvent.preventDefault();
    if (!student) {
      await Swal.fire({
        title: 'Que deseas hacer con este evento?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Editar`,
        denyButtonText: `Eliminar`,
        cancelButtonText: 'Cancelar',
        customClass: {
          cancelButton: 'order-1 right-gap',
          confirmButton: 'order-2',
          denyButton: 'order-3',
        },
        html: clickInfo.event.url ? `
           <a href=${clickInfo.event.url} target="_blank">Ir al link del evento</a>
           ` : null
      }).then((result) => {
        if (result.isConfirmed) {
          editevent(clickInfo)
        } else if (result.isDenied) {
          Swal.fire('Evento eliminado', '', 'error')
          dispatch(deleteEvent(clickInfo.event._def.publicId))
        }
        setTimeout(() => {
          dispatch(update())
        }, 100)
      })
    } else if (clickInfo.event.url) {
      window.open(clickInfo.event.url);
    }
  }

  const handleEvents = (events) => {
    setCurrentEvents(events)
  }

  const renderSidebar = () => {
    return (
      <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
          {student ?
            <div style={{ display: 'flex' }}>
              <h6>Perteneces al cohorte: {student[0].cohorte.name}</h6>
            </div>
            :
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel className={classes.inputlabel}>Seleccione un cohorte</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={cohorteId}
                // defaultValue={student ? student[0].cohorteId : null}
                onChange={handleChangeCohorteId}
              >
                {cohortes && cohortes.map((el, i) => (
                  <MenuItem value={el.id}>{el.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          }
          <ul>
            <li>Hace click en una fecha para crear un nuevo evento</li>
            <li>Arrastra, suelta y cambia el tamaño de los eventos</li>
            <li>Hace click en un evento para eliminarlo</li>
          </ul>
        </div>
        <div className='demo-app-sidebar-section'>
          <input
            type='checkbox'
            checked={weekendsVisible}
            onChange={handleWeekendsToggle}
          ></input> <label>Alternar dias de fin de semana</label>
        </div>
        <div className='demo-app-sidebar-section'>
          <h2>Todos los eventos ({currentEvents.length})</h2>
          <ul>
            {currentEvents.map(renderSidebarEvent)}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className='demo-app'>
      <div className='side-bar'>
        {renderSidebar()}
      </div>
      <div className='demo-app-main'>
        <FullCalendar
          locale={esLocale}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
          }}
          initialView='dayGridMonth'
          eventDisplay='auto'
          editable={student ? false : true}
          selectable={student ? false : true}
          selectMirror={false}
          dayMaxEvents={true}
          events={getEvents && getEvents}
          weekends={weekendsVisible}
          nowIndicator={true}
          navLinks={true}
          // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          eventChange={handleDragEvent}
        /* you can update a remote database when these fire:
        eventAdd={function(){}}
        eventRemove={function(){}}
        */
        />
      </div>
    </div>
  )
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}
function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}{!event.allDay ? ' -' + ' ' + formatDate(event.start, { hour: '2-digit', minute: '2-digit' }) : null}:</b>
      <i>{event.title}</i>
    </li>
  )
}