import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import configureStore from './store-config';
import routes from './routes';

injectTapEventPlugin();
const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
            {routes}
    </Provider>,
    document.getElementById('root')
);

