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
import students from './students'
import student from './student'
import update from './update'
import groupPm from './groupPm.js'
import msg from './msg'
import studentsByGroupPM from './studentsByGroupPM'
import gruposPPByPmId from './pp'
import styudentsByPpId from './studentsByPpId'
import myGroupPp from './myGroupPp'
import newStudent from './newStudentInGroupPp'




const rootReducer = combineReducers({
    usuario,
    groupPm,
    panel,
    login,
    getCohorteUser,
    getAlumnosCohorte,
    modulos,
    pm,
    cohortes,
    instructors,
    usuarios,
    student,
    students,
    update,
    msg,
    studentsByGroupPM,
    gruposPPByPmId,
    styudentsByPpId,
    myGroupPp,
    newStudent,
});

export default rootReducer;