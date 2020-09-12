import connection from '../database/connection';
import IGame from './IGame';

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

    async getGame(name: string) {

        const gameGetterQuery = 'SELECT id, name, data, creator_id FROM games WHERE name = ?';

        const [rows] = await (await connection as any).execute(
            gameGetterQuery,
            [name]
        );

        const game = rows[0] as IGame;

        if (!game) {
            throw new Error('no game found');
        }

        this.id = game.id;
        this.name = game.name;
        this.data = game.data;
        // this.created = game.created;
        this.creatorId = game.creator_id;
        return game;
    }
}
