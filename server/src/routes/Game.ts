import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';

import IGame from '../classes/IGame';
import Game from '../classes/Game';
// import IUser from '../classes/IUser';
// import User from '../classes/User';

// Init shared
const router = Router();

router.get('/', async (req: Request, res: Response) => {

  const gameInfo = req.query as any as {name: string};

  const game = new Game();

  try {
    const epicGamerData = await game.getGame(gameInfo.name);
    res.send(epicGamerData);

  } catch (e) {
    return res.status(BAD_REQUEST).end();
  }

  return res.status(OK).end();
  res.send('game get');
});

router.post('/create', async (req: Request, res: Response) => {

  const gameInfo = req.query as any as IGame;

  if (!gameInfo) {
    return res.status(BAD_REQUEST).json({});
  }

  if (!req.session!.user) {
    console.log('no session user');
    return res.status(BAD_REQUEST).json({});
  }

  const game = new Game();

  try {
    await game.create(gameInfo.name, gameInfo.data, req.session!.user.id);
  } catch (e) {
    return res.status(BAD_REQUEST).end();
  }

  return res.status(CREATED).end();
});

export default router;
