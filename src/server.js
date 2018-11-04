import express from 'express';

import { PORT } from './constants';
import todosRouter from './todos';

const app = express();

app.get('/', (req, res) => res.send('Hello!'));

app.use('/todos', todosRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
