import express from 'express';
const path = require('path');
const app = express();

app.get('/', (req, res) => res.status(200).sendFile(path.join(__dirname, '../../index.html')));

// catch all path handler
app.use((req, res, next) => res.status(404).send('No page found'));

// global error handler
app.use((err, res, req, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown error',
    status: 500,
    message: { err: 'something went wrong in server' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).send(errorObj.message);
});

module.default.exports = app;
