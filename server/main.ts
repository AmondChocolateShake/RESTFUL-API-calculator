import express, { Request, Response } from 'express';
import * as Calc from './calculators'

const app = express();
const port = 3000;



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express with TypeScript!');
});







