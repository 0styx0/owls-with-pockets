import { initReducer } from '../init_functions';
import { STATUS } from '../constants';

const initialState = {
    loggedIn: false,
};

export default initReducer(initialState, {
    [STATUS]: (state: any) =>
        Object.assign({}, state, {
            loggedIn: false,
        }),
});
