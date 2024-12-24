const express = require('express');
const userRouter = require('./usersRouter');
const petsRouter = require('./petsRouter');

// екземпляр роутеру
// містить ті ж методи маршрутизації що і app
const rootRouter = express.Router();

rootRouter.use('/users', userRouter);
rootRouter.use('/pets', petsRouter);

module.exports = rootRouter;