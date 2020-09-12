import { initReducer } from '../init_functions';
import { USER } from '../constants';

const initialState = {
    status: 'pre',
    userID: null,
};

export default initReducer(initialState, {
    [USER]: (state: any) =>
        Object.assign({}, state, {
            status: 'pre',
            userID: null,
        }),
});