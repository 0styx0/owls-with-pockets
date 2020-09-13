import { login_user } from './requests';
import { USER } from './constants';
import { debug } from 'console';

export function login_succ(response: any) {
    if (response === '200') {
        return {
            type: USER,
            payload: {
                status: 'loggedin'
            },
        };
    }
}


export function login_fail() {
    return {
        type: USER,
        payload: {
            status: 'failure',
        },
    };
}

export function loginUser(email:any, password:any) {
    console.log('action initiated');
    login_user(email,password);
    return function (dispatch: any) {
        return login_user(email, password)
            .then(response => response.data)
            .then(response => {
                try {
                    dispatch(login_succ(response));
                } catch (e) {
                    alert(e);
                    dispatch(login_fail());
                }
            })
    };
}
