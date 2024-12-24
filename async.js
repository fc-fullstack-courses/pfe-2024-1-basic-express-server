function getUsers1() {
  return fetch('https://randomuser.me/api')
    .then((res) => res.json())
    .then((data) => data.results);
}

// getUsers1().then((data) => {
//   console.log(data);
// });

function asyncFunc1() {
  const promise = new Promise((res, rej) => {
    res(10);
  });

  return promise;
}

function asyncFunc2() {
  return Promise.resolve(100);
}

// asyncFunc1().then(data => console.log(data));
// asyncFunc2().then(data => console.log(data));

// async - перетворює функцію на асинхронну
// тобто функцію яка завжди повертає проміс

async function asyncFunc3() {
  // throw 10000;
  return 1000;
}

// const asyncFunc4 = async function () {

// }

// const asyncFunc5 = async () => {

// }

// asyncFunc3().then(data => console.log(data));

/*
  Всередині асинзроних функцій ви можете використовувати ключове слово await
  await пишемо перед промісами і вони дозволяють отримати результат промісу напряму
*/

function getUsers2() {
  const fetchPromise = fetch('https://randomuser.me/api?seed=1234');

  const dataPromise = fetchPromise.then((res) => res.json());

  const usersPromise = dataPromise.then((data) => data.results);

  return usersPromise;
}

async function getUsers3() {
  const res = await fetch('https://randomuser.me/api?seed=1234');

  const data = await res.json();

  return data.results;
}

// getUsers2().then(data => console.log(data));
// getUsers3().then(data => console.log(data));

// обробка помилок з async / await

const shouldThrow = Math.random() > 0.5;

function errorFunc() {
  const promise = new Promise((res, rej) => {
    if (shouldThrow) {
      rej('error');
    } else {
      res('success');
    }
  });

  return promise;
}

function goStuff1() {
  errorFunc()
    .then((data) => console.log(data))
    .catch((err) => console.log(`ERROR: ${err}`))
    .finally(() => console.log('finally'));
}

async function goStuff2() {
  try {
    const data = await errorFunc();
    console.log(data);
  } catch (err) {
    console.log(`ERROR: ${err}`);
  } finally {
    console.log('finally');
  }
}

goStuff1();
goStuff2();