import React from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list';
import Swal from 'sweetalert2'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import './main.css'
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import DialogTitle from '@material-ui/core/DialogTitle';

  // const Transition = React.forwardRef(function Transition(props, ref) {
  //   return <Slide direction="up" ref={ref} {...props} />;
  // });

  export default function Calendar () {
    const [open, setOpen] = React.useState(false);
    const [weekendsVisible, setWeekendsVisible] = React.useState(true)
    const [currentEvents, setCurrentEvents] = React.useState([])

    // const handleClickOpen = () => {
    //   console.log('clickeaste')
    //   setOpen(true);
    // };
  
    // const handleClose = () => {
    //   setOpen(false);
    // };
  
    const handleWeekendsToggle = () => {
      setWeekendsVisible(!weekendsVisible)
    }
  
    const handleDateSelect = (selectInfo) => {
      let calendarApi = selectInfo.view.calendar
      calendarApi.unselect() // clear date selection
      let date = new Date().toISOString().replace(/T.*$/, '') + 'T12:00:00'
      console.log(date)
      let time = 'notime'
      let arrResult =  []

      const inputOptions = new Promise((resolve) => {
          resolve({
            'Todo el dia': 'Todo el dia',
            'Horario': 'Horario',
            // '#0000ff': 'Blue'
          })
      })
      
      // const { value: color } = Swal.fire({
      //   title: 'Select color',
      //   input: 'radio',
      //   inputOptions: inputOptions,
      //   inputValidator: (value) => {
      //     if (!value) {
      //       return 'You need to choose something!'
      //     }
      //   }
      // })
      
      // if (color) {
      //   Swal.fire({ html: `You selected: ${color}` })
      // }
      
      const { result: allDayOrHour } = Swal.mixin({
        confirmButtonText: 'Sigueinte &rarr;',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        progressSteps: ['1', '2', '3']
      }).queue([
        {
          title: 'Titulo del evento',
          input: 'text',
        },
        {
          title: 'Tipo de evento',
          input: 'radio',
          inputOptions: inputOptions,
          inputValidator: (result) => {
            return !result && 'Debes seleccionar al menos una opcion'
          }
        },
      ]).then((result) => {
        console.log(result)
        if (result.value && result.value.length !== 0) {
          if (result.value[1] === 'Horario'){
            // const inputValue = 345.67
            // const inputStep = 1
            // let time = 'notime'
            Swal.fire({
              title: 'Selecciona el horario de tu nuevo evento',
              html: `
                <input
                  type="time"
                  
                  class="swal2-input"
                  id="range-value">`,
              confirmButtonText: 'Crear evento',
              // input: 'range',
              // inputValue,
              // inputAttributes: {
              //   min: 0,
              //   max: 1000,
              //   step: inputStep
              // },
              didOpen: () => {
                // const inputRange = Swal.getInput()
                const inputNumber = Swal.getContent().querySelector('#range-value')
                // console.log('inputRange', inputRange)
                console.log('inputNumber', inputNumber)
                // <input 
              // type="time" 
              // id="time-value"
              // value="${inputValue}"
              // name="time-value" 
              // required>
                // remove default output
                // inputRange.nextElementSibling.style.display = 'none'
                // inputRange.style.width = '100%'
            
                // sync input[type=number] with input[type=range]
                // inputRange.addEventListener('input', () => {
                //   inputNumber.value = inputRange.value
                // })
            
                // sync input[type=range] with input[type=number]
                inputNumber.addEventListener('change', () => {
                  time = inputNumber.value
                  console.log(time)
                })
              }
            })
          } else {
            Swal.fire({
              title: 'Selecciona el dia del evento',
              html: `
                Your answers:
                
              `,
              confirmButtonText: 'Crear evento'
            })
          }
          // if (result.isConfirmed && result.value.length > 0) {
          //   console.log(result.value)
          //   calendarApi.addEvent({
          //     id: createEventId(),
          //     title: result.value,
          //     start: selectInfo.startStr,
          //     end: selectInfo.endStr,
          //     allDay: true
          //   })
          // }
        }
        return promise;
      })
      
      // Swal.fire({
      //   title: 'Titulo del evento',
      //   input: 'text',
      //   inputAttributes: {
      //     autocapitalize: 'off'
      //   },
      //   showCancelButton: true,
      //   cancelButtonText: 'Cancelar',
      //   confirmButtonText: 'Aceptar',
      //   showLoaderOnConfirm: true,
      // }).then((result) => {
        // if (result.isConfirmed && result.value.length > 0) {
        //   console.log(result.value)
        //   calendarApi.addEvent({
        //     id: createEventId(),
        //     title: result.value,
        //     start: selectInfo.startStr,
        //     end: selectInfo.endStr,
        //     allDay: true
        //   })
        // }
      // })
    }
  
    const handleEventClick = (clickInfo) => {
      if (window.confirm(`¿Estas seguro que queres eliminar el evento: '${clickInfo.event.title}'?`)) {
        clickInfo.event.remove()
      }
    }
  
    const handleEvents = (events) => {
      setCurrentEvents(events)
    }

    const renderSidebar= () => {
      return (
        <div className='demo-app-sidebar'>
          <div className='demo-app-sidebar-section'>
            <h2>Instrucciones de uso</h2>
            <ul>
              <li>Hace click en una fecha para crear un nuevo evento</li>
              <li>Arrastra, suelta y cambia el tamaño de los eventos</li>
              <li>Hace click en un evento para eliminarlo</li>
            </ul>
          </div>
          <div className='demo-app-sidebar-section'>
            <label>
              <input
                type='checkbox'
                checked={weekendsVisible}
                onChange={handleWeekendsToggle}
              ></input>
               Alternar dias de fin de semana
            </label>
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
        {renderSidebar()}
        <div className='demo-app-main'>
          <FullCalendar
            locale= 'es'
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,list'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={weekendsVisible}
            initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick}
            eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
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
      <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}:</b>
      <i>{event.title}</i>
    </li>
  )
}
function CreateEventDialog() {
  return (
    <div>
          <Dialog
            open={true}
            // TransitionComponent={Transition}
            keepMounted
            // onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">{"Use Google's location service?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Let Google help apps determine location. This means sending anonymous location data to
                Google, even when no apps are running.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button color="primary">
                Disagree
              </Button>
              <Button onClick={() => alert('puto')}color="primary">
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </div>
  )
}