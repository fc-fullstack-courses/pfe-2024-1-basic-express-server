const express = require('express');
const {
  registrationValidationMW,
  updateUserMW,
} = require('./middlewares/usersMW');
const UserController = require('./controllers/userController');

const app = express();

const bodyParser = express.json();

app.get('/users', UserController.getUsers);
app.get('/users/:userId', UserController.getUser);
app.delete('/users/:userId', UserController.deleteUser);
app.put('/users/:userId', bodyParser, updateUserMW, UserController.updateUser);
app.post(
  '/users',
  bodyParser,
  registrationValidationMW,
  UserController.createUser
);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
