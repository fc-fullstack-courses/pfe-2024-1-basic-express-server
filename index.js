const express = require('express');
const yup = require('yup');

const REGISTRATION_SCHEMA = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .matches(/^.{8,32}$/, 'enter valid password')
    .required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  age: yup.number(),
});

// app - екземпляр серверу експресса
const app = express();

const users = [
  { id: 0, email: 'email1@gmail.com', password: '12345admin' },
  { id: 1, email: 'email2@gmail.com', password: 'sadsadsa' },
  { id: 2, email: 'email3@gmail.com', password: '423rfdf42d' },
  { id: 3, email: 'email4@gmail.com', password: 'dsac4354f' },
  { id: 4, email: 'email5@gmail.com', password: 'd4354fef' },
];

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
  (req, res, next) => {
    console.log('callback 1');
    req.data = { id: 5 };
    // каже що міддлвер зробив своє діло і можна викликати наступний обробник у ланцюжку
    next();
  },
  // проміжний обробник запиту (міддлвер)
  (req, res, next) => {
    console.log('callback 2');
    console.log(req.data.id); // 5
    next();
  },
  // проміжний обробник запиту (міддлвер)
  (req, res, next) => {
    console.log('callback 3');

    const isRequestValid = Math.random() > 0.5;
    if (isRequestValid) {
      next();
    } else {
      res.send('Invalid data');
    }
  },
  // кінцевий обробник запиту
  (req, res, next) => {
    console.log('callback 4');
    // метод send дозволяє повернути у відповідь стрінгу, об'єкт, масив, булеве значення без перетворень
    res.send('Hello World!');
  }
);

app.get('/users', (request, response) => {
  response.send(users);
});

// реєстрація користувача
/*
  1. отримати дані користувача з запиту
  2. перевіріти дані на валідність
  3. зберігти діні (реально їх записують у БД)
  4. створити сессію для користувача
  5. підготувати дані юзера до відправки
  6. відправити дані у якості відповіді
*/

// міддлвер який отримає json дані з запиту
const bodyParser = express.json();

app.post(
  '/users',
  bodyParser,
  (req, res, next) => {
    console.log(req.body); // дані з тіла запиту

    REGISTRATION_SCHEMA.validate(req.body)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((error) => {
        res.send(error.message);
      });
  },
  (req, res, next) => {
    const newUser = { ...req.user };

    newUser.id = Date.now();

    users.push(newUser);

    const { password, ...preparedUser } = newUser;

    res.send(preparedUser);
  }
);

const PORT = 5000;

// запуск серверу
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
