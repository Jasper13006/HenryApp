import swal from 'sweetalert2'

export const createEvent = (event) => async dispatch => {
	try {
		const data = await fetch('http://localhost:3001/calendar/createEvent', {
			method: 'POST',
			body: JSON.stringify(event),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		// const res = await data.json()
		// return (res)
		
		// dispatch({
		// 	type: 'CREATE_EVETN',
		// 	payload: res.event,
		// })
	} catch (error) {
		console.log(error)
		// swal('Algo salio mal', ':(', 'error')
	}
}

export const deleteEvent = (id) => async dispatch => {
	try {
		const data = await fetch('http://localhost:3001/calendar/deleteEvent', {
			method: 'DELETE',
			body: JSON.stringify({
				eventId: id
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
	} catch (error) {
		console.log(error)
		// swal('Algo salio mal', ':(', 'error')
	}
}

export const modifyEvent = (event) => async dispatch => {
	try {
		const data = await fetch('http://localhost:3001/calendar/editEvent', {
			method: 'PUT',
			body: JSON.stringify(event),
			headers: {
				'Content-Type': 'application/json'
			}
		})
	} catch (err) {
		console.log(err)
	}
}