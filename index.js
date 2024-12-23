const express = require('express');

// app - екземпляр серверу експресса
const app = express();

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
app.get('/', (req, res) => {
  // метод send дозволяє повернути у відповідь стрінгу, об'єкт, масив, булеве значення без перетворень
  res.send('Hello World!')
});

app.get('/users', (request, response) => {
  response.send([{}, {}, {}])
})

const PORT = 5000;

// запуск серверу
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});