const { Router } = require('express');
const indexRouter = Router();

const messages = [
  {
    text: 'Hi there!',
    user: 'Amando',
    added: new Date(),
  },
  {
    text: 'Hello world!',
    user: 'Charles',
    added: new Date(),
  },
];

indexRouter.get('/', (req, res) => {
  res.render('displayMessage', { title: 'Mini Messageboard', messages: messages });
});

indexRouter.get('/new', (res, req) => {
  res.render('form');
});

indexRouter.post('/new', (res, req) => {
  const messageUser = req.body.user;
  const messageText = req.body.message;
  messages.push({ messages: messageText, user: messageUser, added: new Date() });

  res.redirect('/');
});

module.exports = indexRouter;
