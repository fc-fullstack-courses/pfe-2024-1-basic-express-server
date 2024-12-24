const express = require('express');
const router = require('./routers');
const app = express();

// під'єднує до app на всі методи міддлвер (в даному випадку роутера)
app.use(router);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
