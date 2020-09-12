import { createStore } from 'redux';
import comboReducer from './reducers/combo-reducer';

export default function configureStore() {
    const store = createStore(
        comboReducer
    );

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers/combo-reducer').default;

            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}