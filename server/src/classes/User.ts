import IUser from './IUser';

export default class User {

    public id = '';
    public username = '';
    public firstname = '';
    public lastname = '';
    private password = '';

    async create(user: IUser) {
        // TODO: save to db
        this.login(user.username, user.password);
    }

    async login(username: string, password: string) {
        // TODO: login
        this.firstname = 'bob';
        this.lastname = 'sam';
        this.password = 'pass';
        this.id = 'id';

    }
}

