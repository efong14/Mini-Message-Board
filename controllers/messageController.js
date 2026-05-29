const { body, validation, matchedData, validationResult } = require('express-validator');
const db = require('../db/queries');

const usernameError = 'must be between 1 and 255 characters';
const messageError = 'must be between 1 and 1000 characters';

const validateMessage = [
  body('username').trim().isLength({ min: 1, max: 255 }).withMessage(`Username ${usernameError}`),
  body('message').trim().isLength({ min: 1, max: 1000 }).withMessage(`Message ${messageError}`),
];

async function allMessagesGet(req, res) {
  const messages = await db.getAllUsernames();

  res.render('displayMessage', {
    title: 'Mini Message board',
    messages: messages,
  });
}

async function formGet(req, res) {
  res.render('form');
}

async function messageGet(req, res) {
  const message = await db.getUsername(req.params.id);

  console.log(message);

  res.render('messageDetails', {
    title: 'Message Details',
    message: message,
  });
}

const messagePost = [
  validateMessage,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('form', {
        errors: errors.array(),
      });
    }
    const { username, message } = matchedData(req);
    const date = new Date();
    await db.insertMessage(username, message, date);
    res.redirect('/');
  },
];

// async function messagePost(req, res) {
//   const { username, message } = req.body;
//   const date = new Date();
//   await db.insertMessage(username, message, date);
//   res.redirect('/');
// }

module.exports = {
  allMessagesGet,
  formGet,
  messageGet,
  messagePost,
};
