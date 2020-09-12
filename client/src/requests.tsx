import axios from 'axios';

export function login_user(username:string, password:string) {
    console.log('sending post');
    return axios.post('http://localhost:3000/user/login', {
        username,
        password
    });
}