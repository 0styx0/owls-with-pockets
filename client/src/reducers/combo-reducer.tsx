import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import login from './login-reducer';
import home from './home-reducer';

const comboReducer = combineReducers({
    routing: routerReducer,
    login,
    home,
});

export default comboReducer;