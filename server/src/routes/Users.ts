import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';

import IUser from '../classes/IUser';
import User from '../classes/User';

// Init shared
const router = Router();


router.get('/', (req: Request, res: Response) => {
  res.send('users get');
});

router.post('/create', async (req: Request, res: Response) => {

    const userInfo = req.query as any as IUser;

    console.log(userInfo);
    if (!userInfo) {
        return res.status(BAD_REQUEST).json({
        });
    }

    const user = new User();

    try {
      await user.create(userInfo);
    } catch (e) {
      return res.status(BAD_REQUEST).end();
    }

    return res.status(CREATED).end();
});

router.post('/login', async (req: Request, res: Response) => {

    const userInfo = req.query as any as IUser;
    if (!userInfo) {
        return res.status(BAD_REQUEST).json({
        });
    }

    const user = new User();
    try {
      await user.login(userInfo.username, userInfo.password);
    } catch (e) {
      console.log(e);
      return res.status(BAD_REQUEST).end();
    }
    console.log(user);

    req.session!.user = user;
    console.log(user.username + ' logged in');

    return res.status(OK).end();
});

/******************************************************************************
 *                      Get All Users - "GET /api/users/all"
 ******************************************************************************

router.get('/all', async (req: Request, res: Response) => {
    const users = await userDao.getAll();
    return res.status(OK).json({users});
});


/******************************************************************************
 *                       Add One - "POST /api/users/add"
 ******************************************************************************

router.post('/add', async (req: Request, res: Response) => {
    const { user } = req.body;
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    await userDao.add(user);
    return res.status(CREATED).end();
});


/******************************************************************************
 *                       Update - "PUT /api/users/update"
 ******************************************************************************

router.put('/update', async (req: Request, res: Response) => {
    const { user } = req.body;
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: paramMissingError,
        });
    }
    user.id = Number(user.id);
    await userDao.update(user);
    return res.status(OK).end();
});


/******************************************************************************
 *                    Delete - "DELETE /api/users/delete/:id"
 ******************************************************************************

router.delete('/delete/:id', async (req: Request, res: Response) => {
    const { id } = req.params as ParamsDictionary;
    await userDao.delete(Number(id));
    return res.status(OK).end();
});


/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
