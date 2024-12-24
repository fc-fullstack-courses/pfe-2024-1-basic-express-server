const petsRouter = require('express').Router();

petsRouter.get('/', (req, res) => {
  res.send('array of pets');
});

module.exports = petsRouter;
