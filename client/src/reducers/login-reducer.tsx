import { initReducer } from '../init_functions';
import { USER } from '../constants';

const initialState = {
    token: null,
    userID: null,
};

export default initReducer(initialState, {
    [USER]: (state: any) =>
        Object.assign({}, state, {
            token: null,
            userID: null,
        }),
});