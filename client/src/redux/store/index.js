import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

/* ------------------------------------------------------------------------------- /
/ CREATION STORE /
/ ------------------------------------------------------------------------------- */

const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;