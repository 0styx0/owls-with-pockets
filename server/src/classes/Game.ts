import connection from '../database/connection';

export default class Game {

    public id = '';
    public name = '';
    public data = '';
    public created = '';
    public creatorId = '';

    async create(name: string, data: string, creatorId: string) {

        const creationQuery = 'INSERT INTO games (name, data, creator_id) VALUES(?, ?, ?)';

        return await (await (connection as any)).execute(
            creationQuery,
            [name, data, creatorId]
        );
    }
}
