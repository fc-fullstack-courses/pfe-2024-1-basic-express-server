const express = require('express');
const rootRouter = require('./routers');
const app = express();

// під'єднує до app на всі методи міддлвер (в даному випадку роутера)
app.use(rootRouter);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
