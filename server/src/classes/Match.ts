import connection from '../database/connection';

export default class Match {

    static async matchMePwettyPweaseUwu(gameId: string, userId: string) {

        const matchFound = await Match.findMatch(gameId, userId);

        if (matchFound) {
            return await Match.matchUsers(matchFound.id, userId);
        }

        return await Match.createWaitingMatch(gameId, userId);
    }

    static async findMatch(gameId: string, userId: string) {

        console.log('findMatch');
        const matchQuery = 'SELECT person1, id FROM matches WHERE (game_id = ? AND person1 != ?) AND (person2 IS NULL)';

        const [rows] = await (await connection as any).execute(
            matchQuery,
            [gameId, userId]
        );

        if (!rows) {
            console.log('\tno matches fonud');
            return false;
        }

        console.log('\tyes matches fonud');
        return rows[0];
    }

    static async createWaitingMatch(gameId: string, userId: string) {

        console.log('createWaitingMatch');
        const noDupsQuery = 'SELECT id FROM matches WHERE game_id = ? AND person1 = ? and person2 IS NULL';

        const [rows] = await (await connection as any).execute(
            noDupsQuery,
            [gameId, userId]
        );

        if (rows) {
            console.log('\talready waiting');
            return false; // already watinig on a match. dont re-add
        }

        const creationQuery = 'INSERT INTO matches (person1, game_id) VALUES(?, ?)';
        console.log('\tinserting row');

        return await (await (connection as any)).execute(
            creationQuery,
            [userId, gameId]
        );
    }

    static async foundMatch(gameId: string, userId: string) {

        console.log('foundMatch');
        const foundMatchQuery = 'SELECT person1, person2, id FROM matches WHERE game_id = ? AND (person1 = ? OR person2 = ?) AND person1 IS NOT NULL AND person2 IS NOT NULL AND matched != ?';

        const [rows] = await (await connection as any).execute(
            foundMatchQuery,
            [gameId, userId, userId, 1]
        );

        if (rows) {

            console.log('\tfound match');
            const matched = 'UPDATE matches SET matched = ? WHERE id = ?';
            await (await (connection as any)).execute(
                matched,
                [1, rows[0].id]
            );
        }

        return rows[0];
    }

    static async matchUsers(matchId: string, userId: string) {

        console.log('matchUsers');
        const matchQuery = 'UPDATE matches SET person2 = ? WHERE id = ?';

        return await (await (connection as any)).execute(
            matchQuery,
            [userId, matchId]
        );
    }
}
