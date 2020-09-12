import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import login from './login-reducer';
import home from './home-reducer';
import { combineForms } from 'react-redux-form';

const initialUser = { name: '', passcode: '' };

const comboReducer = combineReducers({
    routing: routerReducer,
    login,
    home,
    myforms: combineForms({
        user: initialUser,
    }),
});

export default comboReducer;