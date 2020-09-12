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

        const loginQuery = 'SELECT id, username, firstname, lastname, password FROM users WHERE username = ?';

        const [rows] = await (await connection as any).execute(
            loginQuery,
            [username]
        );

        const user = rows[0] as IUser;

        const isCorrectPassword = await bcrypt.compare(password, user.password);

        if (!isCorrectPassword) {
            throw new Error('incorrect password');
            return false;
        }

        this.id = user.id;
        this.username = user.username;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.password = user.password;

        return true;
    }
}


