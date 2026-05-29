const { Router } = require('express');
const indexRouter = Router();
const messageController = require('../controllers/messageController');

indexRouter.get('/', messageController.allMessagesGet);
indexRouter.get('/message/:id', messageController.messageGet);
indexRouter.get('/new', messageController.formGet);
indexRouter.post('/new', messageController.messagePost);

module.exports = indexRouter;
