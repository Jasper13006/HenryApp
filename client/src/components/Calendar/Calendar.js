import React from 'react'
import FullCalendar, { formatDate, renderMicroColGroup } from '@fullcalendar/react'
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
import DialogTitle from '@material-ui/core/DialogTitle';
import esLocale from '@fullcalendar/core/locales/es';

  export default function Calendar () {
    const [weekendsVisible, setWeekendsVisible] = React.useState(true)
    const [currentEvents, setCurrentEvents] = React.useState([])
  
    const handleWeekendsToggle = () => {
      setWeekendsVisible(!weekendsVisible)
    }
  
    const handleDateSelect = async (selectInfo) => {
      let calendarApi = selectInfo.view.calendar
      calendarApi.unselect() // clear date selection
      let date = new Date().toISOString().replace(/T.*$/, '') + 'T12:00:00'
      console.log(date)
      let timestart = ''
      let timeend = ''
      let arrResult =  []
      console.log(selectInfo)
      
      await Swal.mixin({
        confirmButtonText: 'Sigueinte &rarr;',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        progressSteps: ['1', '2']
      }).queue([
        {
          title: 'Titulo del evento',
          input: 'text',
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
      ]).then((result) => {
        arrResult = result
      })

        if (arrResult.value && arrResult.value.length !== 0) {
          if (arrResult.value[1] === 'Horario'){

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
          console.log('Entro al if')
          calendarApi.addEvent({
            id: createEventId(),
            title: arrResult.value[0],
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: true
          })
        } else {
          console.log('entro al else')
          calendarApi.addEvent({
            id: createEventId(),
            title: arrResult.value[0],
            startRecur: selectInfo.startStr,
            endRecur: selectInfo.endStr,
            startTime: timestart,
            endTime: timeend,
            allDay: false
          })
        }
      }
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
            locale={esLocale}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
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