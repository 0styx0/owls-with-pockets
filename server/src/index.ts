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

  ws.on('message', function(msg: any) {
    console.log(msg);
  });


  const matchFound = await Match.findMatch('1', req.session!.user.id);

  if (matchFound) {
      console.log('match found');
      await Match.matchUsers(matchFound.id, req.session!.user.id);
      ws.send('found match');
  } else {
    console.log('creating waiting match');
    const waiting = await Match.createWaitingMatch('1', req.session!.user.id);

    if (!waiting) {
      await Match.foundMatch('1', req.session!.user.id);
      ws.send('found me;)');
    }

    ws.send('waiting');
  }

  console.log('in ws');
});

app.use(routes);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
