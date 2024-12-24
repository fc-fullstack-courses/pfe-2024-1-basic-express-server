const express = require('express');
const rootRouter = require('./routers');
const app = express();

const bodyParser = express.json();
// під'єднує до app на всі методи міддлвер обробки json даних
app.use(bodyParser);

// під'єднує до app на всі методи міддлвер роутера
app.use(rootRouter);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
