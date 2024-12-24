const express = require('express');
const {
  registrationValidationMW,
  updateUserMW,
} = require('../middlewares/usersMW');
const UserController = require('../controllers/userController');

const userRouter = express.Router();

userRouter.get('/', UserController.getUsers);
userRouter.get('/:userId', UserController.getUser);
userRouter.delete('/:userId', UserController.deleteUser);
userRouter.put('/:userId', updateUserMW, UserController.updateUser);
userRouter.post('/', registrationValidationMW, UserController.createUser);

module.exports = userRouter;
