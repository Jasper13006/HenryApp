import { combineReducers } from 'redux';

import usuario from './user'
import panel from './panel'
import login from './login'
  
const rootReducer = combineReducers({
    usuario,
    panel,
    login,
});

export default rootReducer;