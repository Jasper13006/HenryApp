import { GET_USER } from '../consts/actionTypes'

const initialState = {
    user: {
        name: "Rodrigo",
        lastName: "Mansilla",
        email: "tomasmaldonado297@gmail.com",
        password: "hola1234",
        city: "bogota",
        country: "colombia",
        active: true,
        student: true,
        pm: false,
        instructor: false,
        admin: false,
        image: "https://th.bing.com/th/id/OIP.XVQhw3zWkizu6LGmEvAmqwHaHa?w=182&h=181&c=7&o=5&pid=1.7",
        googleId: "",
        gitHubId: ""
    }
}

export default function usuario(state= initialState, action){
    switch (action.type) {
        // case GET_USER:
        //         return {
        //             ...state,
        //             data: action.payload
        //         }
        default:
            return{
                ...state
            };
    }
}