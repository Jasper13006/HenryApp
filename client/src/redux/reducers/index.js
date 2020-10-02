import { combineReducers } from 'redux';
import usuario from './user'
import panel from './panel'

const rootReducer = combineReducers({
    usuario,
    panel,

});

export default rootReducer;