import { createStore } from 'redux';
import comboReducer from './reducers/combo-reducer';

export default function configureStore() {
    const store = createStore(
        comboReducer,
    );

    return store;
}