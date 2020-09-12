import axios from 'axios';

export function login_user(email:string, password:string) {
    return axios.post('/api/login', {
        email,
        password,
    });
}