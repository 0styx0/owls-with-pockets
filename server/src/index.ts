import express, { Request, Response } from 'express';
import session from 'express-session';
import routes from './routes/index';
const app = express();
const port = 3000;

app.use(session({
  secret: 'pocket-owl',
  // cookie: { secure: true }
}));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');

});

app.use(routes);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
