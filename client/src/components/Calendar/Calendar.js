import React, {useEffect, useState} from 'react'
import FullCalendar, { formatDate, renderMicroColGroup } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list';
import Swal from 'sweetalert2'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import './main.css'
import esLocale from '@fullcalendar/core/locales/es';
import bootstrapPlugin from '@fullcalendar/bootstrap';

  export default function Calendar () {
    const [weekendsVisible, setWeekendsVisible] = useState(true)
    const [currentEvents, setCurrentEvents] = useState([]) //VARIABLE PARA GUARDAR TODOS LOS EVENTOS
    const [getEvents, setGetEvents] = useState()
    console.log(INITIAL_EVENTS)


    useEffect(() => {
      fetch(`http://localhost:3001/calendar/1`)
      .then(res => res.json())
      .then(data => {
        setGetEvents(data)
        INITIAL_EVENTS.push(data)
        console.log(data)
      })
  }, [])

    const handleWeekendsToggle = () => {
      setWeekendsVisible(!weekendsVisible)
    }
  
    const handleDateSelect = async (selectInfo) => {
      let calendarApi = selectInfo.view.calendar
      calendarApi.unselect() // clear date selection
      let timestart = ''
      let timeend = ''
      let arrResult =  []
      
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
          calendarApi.addEvent({
            id: createEventId(),
            title: arrResult.value[0],
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: true
          })
        } else {
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

    const handleEditEvent = async (data) => {

    }
  
    const handleEventClick = async (clickInfo) => {
     await Swal.fire({
        title: 'Que deseas hacer con este evento?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `Editar`,
        denyButtonText: `Eliminar`,
        customClass: {
          cancelButton: 'order-1 right-gap',
          confirmButton: 'order-2',
          denyButton: 'order-3',
        }
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(clickInfo)
          handleDateSelect(clickInfo)
        } else if (result.isDenied) {
          Swal.fire('Evento eliminado', '', 'error')
          clickInfo.event.remove()
        }
      })
    }
  
    //esta funcion se llama cada vez que un evento es creado, eliminado o modificado
    const handleEvents = (events) => {
      setCurrentEvents(events)
      console.log('entro al handleEvents')
    }

    const renderSidebar= () => {
      return (
        <div className='demo-app-sidebar'>
          <div className='demo-app-sidebar-section'>
            <label>Cohorte ID: </label><input type='text'/>
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
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin, bootstrapPlugin]}
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
            events={getEvents && getEvents}
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
  console.log(event)
  return (
    <li key={event.id}>
      <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}{!event.allDay ? ' -' + ' ' + formatDate(event.start, {hour: '2-digit', minute: '2-digit'}) : null}:</b>
      <i>{event.title}</i>
    </li>
  )
}