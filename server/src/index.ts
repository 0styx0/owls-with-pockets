import express, { Request, Response } from 'express';
import session from 'express-session';
import routes from './routes/index';
import bodyParser from 'body-parser';
import Match from './classes/Match';

const app = express();
var cors = require('cors');

const expressWs = require('express-ws')(app);

app.use(bodyParser());
app.use(cors());

const port = 3000;

app.use(session({
  secret: 'pocket-owl',
  // cookie: { secure: true }
}));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');

});

(app as any).ws('/match', async (ws: any, req: Request) => {

  console.log('here we are in match ws');
  ws.on('message', function(msg: any) {
    console.log(msg);
    ws.send(JSON.stringify({matchStatus: 'onmessage called'}));
  });


  try {

    const matchFound = await Match.findMatch('1', req.session!.user.id);
    console.log('match found');
    await Match.matchUsers(matchFound.id, req.session!.user.id);
    ws.send(JSON.stringify({matchStatus: 'found match'}));

  } catch (e: any) {

    console.log('creating waiting match');
    try {
      await Match.createWaitingMatch('1', req.session!.user.id);
    } catch (e: any) {

      try {
        await Match.foundMatch('1', req.session!.user.id);
        ws.send(JSON.stringify({matchStatus: 'found me;)'}));
      } catch (e: any) {
        ws.send(JSON.stringify({matchStatus: 'no matches available'}));
      }
    }
  }

  ws.send(JSON.stringify({matchStatus: 'end of fn'}));
  console.log('in ws');
});

app.use(routes);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
