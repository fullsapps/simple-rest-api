import express from 'express';
import http from 'http';
import https from 'https';
import cors from 'cors';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import rfs from 'rotating-file-stream';
import createError from 'http-errors';

import { PORT, BASE_URL } from './shared/constants';
import * as errors from './shared/errors';
import todosRouter from './routes/todos';
import { create } from 'domain';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const logDirectory = path.join(__dirname, 'logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogStream = rfs('combined.log', {
  interval: '1d',
  path: logDirectory
});
app.use(morgan('combined', { stream: accessLogStream }));
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('combined'));
}

app.get(BASE_URL, (req, res) => res.json({ data: 'Hello!' }));

app.use(`${BASE_URL}/todos`, todosRouter);

// 404 - needs to be declared last, before server is created
app.use((req, res, next) => {
  // next(createError(404, 'Not found - requested resource does not exist'));
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  console.log(err);
  const status = err.status ? err.status : 500;
  res.status(status).json({ error: { status, message: err.message } });
});

// http.createServer(app).listen(80);
const options = {
  key: fs.readFileSync('certs/server.key'),
  cert: fs.readFileSync('certs/server.cert')
};
https.createServer(options, app).listen(process.env.PORT || PORT);

console.log('Server started!');
