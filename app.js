const express = require('express');
const path = require('node:path');
const customNotFoundError = require('./errors/customNotFoundError');
const indexRouter = require('./routes/indexRouter');
const newMessageRouter = require('./routes/newMessageRouter');
const app = express();
const PORT = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/new', newMessageRouter);

app.use((req, res, next) => {
  throw new customNotFoundError('Page not found');
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).send(err.message);
});

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log('Now listening to port 3000!');
});
