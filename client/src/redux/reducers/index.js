import { combineReducers } from 'redux';

import usuario from './user'
import panel from './panel'
import login from './login'
import getCohorteUser from './cohorte'
import getAlumnosCohorte from './studentsOfACohort' 


const rootReducer = combineReducers({
    usuario,
    panel,
    login,
    getCohorteUser,
    getAlumnosCohorte,
});

export default rootReducer;