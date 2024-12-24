const express = require('express');
const {
  registrationValidationMW,
  updateUserMW,
} = require('../middlewares/usersMW');
const UserController = require('../controllers/userController');

// екземпляр роутеру
// містить ті ж методи маршрутизації що і app
const router = express.Router();
const bodyParser = express.json();

router.get('/users', UserController.getUsers);
router.get('/users/:userId', UserController.getUser);
router.delete('/users/:userId', UserController.deleteUser);
router.put('/users/:userId', bodyParser, updateUserMW, UserController.updateUser);
router.post(
  '/users',
  bodyParser,
  registrationValidationMW,
  UserController.createUser
);

module.exports = router;