import swal from 'sweetalert2'

export const createEventAllDay = (event) => async dispatch => {
	try {
		const data = await fetch('http://localhost:3001/calendar/createEvent', {
			method: 'POST',
			body: JSON.stringify(event),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const res = await data.json()
		
		// dispatch({
		// 	type: 'CREATE_EVETN',
		// 	payload: res.event,
		// })
	} catch (error) {
		console.log(error)
		swal('Algo salio mal', ':(', 'error')
	}
}