const express = require('express');
const {
  registrationValidationMW,
  updateUserMW,
} = require('./middlewares/usersMW');
const UserController = require('./controllers/userController');

// app - екземпляр серверу експресса
const app = express();

// міддлвер який отримає json дані з запиту
const bodyParser = express.json();

// app містить функції для побудови маршрутів на сервері
// їх назви відповідають назвам HTTP методів
// приймають першим аргументом шлях на сервері
// подальші аргументи - функції оборобники, які запустяться при
// запиті

// app.get();
// app.post();
// app.put();
// app.patch();
// app.delete();

// req та res - об'єкти запиту та відповіді.
app.get(
  '/',
  // проміжний обробник запиту (міддлвер)
  async (req, res, next) => {
    console.log('callback 1');
    req.data = { id: 5 };
    // каже що міддлвер зробив своє діло і можна викликати наступний обробник у ланцюжку
    next();
  },
  // проміжний обробник запиту (міддлвер)
  async (req, res, next) => {
    console.log('callback 2');
    console.log(req.data.id); // 5
    next();
  },
  // проміжний обробник запиту (міддлвер)
  async (req, res, next) => {
    console.log('callback 3');

    const isRequestValid = Math.random() > 0.5;
    if (isRequestValid) {
      next();
    } else {
      res.send('Invalid data');
    }
  },
  // кінцевий обробник запиту
  async (req, res, next) => {
    console.log('callback 4');
    // метод send дозволяє повернути у відповідь стрінгу, об'єкт, масив, булеве значення без перетворень
    res.send('Hello World!');
  }
);

app.get('/users', UserController.getUsers);
app.get('/users/:userId', UserController.getUser);
app.delete('/users/:userId', UserController.deleteUser);
app.put('/users/:userId', bodyParser, updateUserMW, UserController.updateUser);

// реєстрація користувача
/*
  1. отримати дані користувача з запиту
  2. перевіріти дані на валідність
  3. зберігти діні (реально їх записують у БД)
  4. створити сессію для користувача
  5. підготувати дані юзера до відправки
  6. відправити дані у якості відповіді
*/

app.post(
  '/users',
  bodyParser,
  registrationValidationMW,
  UserController.createUser
);

const PORT = 5000;

// запуск серверу
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
