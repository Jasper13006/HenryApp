import { combineReducers } from 'redux';

import usuario from './user'
import panel from './panel'
import login from './login'
import getCohorteUser from './cohorte'
import getAlumnosCohorte from './studentsOfACohort'
import modulos from './modulos'
import pm from './pm'
import cohortes from './cohortes'
import instructors from './getInstructors'
import usuarios from './getUsers'

const rootReducer = combineReducers({
    usuario,
    panel,
    login,
    getCohorteUser,
    getAlumnosCohorte,
    modulos,
    pm,
    cohortes,
    instructors,
    usuarios,
});

export default rootReducer;