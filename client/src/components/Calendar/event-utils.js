
let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr,
    end: todayStr,
    allDay:true,
    color: 'red',
    textColor: 'black'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    startRecur: '2020-10-20',
    endRecur: '2020-10-22',
    startTime: '12:00',
    endTime: '18:00',
    allDay: false,
    color: 'red',
    url: 'http://google.com.ar',
    textColor: 'black'
  },
  {
    id: createEventId(),
    title: 'All-day event',
    start  : '2020-10-25T12:30:00',
    end: '2020-10-25T14:30:00',
    allDay:false,
    color: 'red',
    textColor: 'black',
    url: 'http://google.com.ar',
  },
  {
    id: '999',
    title: 'Repeating Event',
    start: '2020-10-09T16:00:00',
    textColor: 'red',
    borderColor: 'red',
    backgroundColor: 'red'
  },
  {
    groupId: '91',
    title: 'Repeating Event',
    start: '2020-10-09T16:00:00',
    textColor: 'red',
    borderColor: 'red',
    backgroundColor: 'red',
    url: 'http://google.com.ar',
  },
  {
    title: "PREUEBA",
    allday: "false",
    borderColor: "#5173DA",
    color: "#99ABEA",
    textColor: "#000000",
    description: "Fake description for the Free Pizza",
    start: "2020-10-15T16:30:28",
    end: "2020-10-15T17:30:28",
    url: "http://google.com.ar",
    textDecoration: 'none'
},
{
    title: "CSS Meetup",
    allday: "false",
    borderColor: "#820F20",
    color: "#A6113C",
    textColor: "#ffffff",
    description: "Fake description",
    start: "2020-10-19T16:30:28",
    end: "2020-10-19T18:30:28",
    url: "someUrl"
}
]

export function createEventId() {
  return String(eventGuid++)
}

// https://api.github.com/users/tomasbarcojo