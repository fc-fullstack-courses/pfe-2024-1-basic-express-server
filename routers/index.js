const express = require('express');
const userRouter = require('./usersRouter');
const petsRouter = require('./petsRouter');

// екземпляр роутеру
// містить ті ж методи маршрутизації що і app
const rootRouter = express.Router();

rootRouter.use(userRouter);
rootRouter.use(petsRouter);

module.exports = rootRouter;