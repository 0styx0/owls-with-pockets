import connection from '../database/connection';
import IUser from './IUser';
const bcrypt = require('bcrypt');

export default class User {

    public id = '';
    public username = '';
    public firstname = '';
    public lastname = '';
    private password = '';

    async create(user: IUser) {

        const creationQuery = 'INSERT INTO users (username, firstname, lastname, password) VALUES(?, ?, ?, ?)';

        const hash = await bcrypt.hash(user.password, 10);

        console.log('creating user....', user);
        return await (await (connection as any)).execute(
            creationQuery,
            [user.username, user.firstname, user.lastname, hash]
        );
        // this.login(user.username, user.password);
    }

    async login(username: string, password: string) {
        // TODO: login
        const loginQuery = 'SELECT id, firstname, lastname, password FROM users WHERE username = ?';

        const [rows, fields] = await (connection as any).execute(
            loginQuery,
            [username]
        );
        this.firstname = 'bob';
        this.lastname = 'sam';
        this.password = 'pass';
        this.id = 'id';

    }
}


