import { create_user } from './requests';
import { CREATE } from './constants';

export function create_user_succ(response: any) {
    return {
        type: CREATE,
        payload: {
            status: 'created',
        },
    };
}

export function create_user_fail() {
    return {
        type: CREATE,
        payload: {
            status: 'failure',
        },
    };
}
export function createUser(username: string, firstname: string, lastname: string, password: string) {
    console.log('action initiated');
    create_user(username, firstname, lastname, password);
    return function (dispatch: any) {
        return create_user(username, firstname, lastname, password)
            .then(response => response.data)
            .then(response => {
                try {
                    dispatch(create_user_succ(response));
                } catch (e) {
                    alert(e);
                    dispatch(create_user_fail());
                }
            })
    };
}

