import { combineReducers } from 'redux';

import usuario from './user'
import panel from './panel'
import login from './login'
import getCohorteUser from './cohorte'
import getAlumnosCohorte from './studentsOfACohort' 
import modulos from './modulos'
import pm from './pm'


const rootReducer = combineReducers({
    usuario,
    panel,
    login,
    getCohorteUser,
    getAlumnosCohorte,
    modulos,
    pm,
});

export default rootReducer;