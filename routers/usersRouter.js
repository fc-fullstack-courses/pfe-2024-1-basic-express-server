const express = require('express');
const {
  registrationValidationMW,
  updateUserMW,
} = require('../middlewares/usersMW');
const UserController = require('../controllers/userController');

const userRouter = express.Router();

const bodyParser = express.json();

userRouter.get('/users', UserController.getUsers);
userRouter.get('/users/:userId', UserController.getUser);
userRouter.delete('/users/:userId', UserController.deleteUser);
userRouter.put('/users/:userId', bodyParser, updateUserMW, UserController.updateUser);
userRouter.post(
  '/users',
  bodyParser,
  registrationValidationMW,
  UserController.createUser
);

module.exports = userRouter;