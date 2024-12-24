const petsRouter = require('express').Router();

petsRouter.get('/pets', (req, res) => {
  res.send('array of pets');
});

module.exports = petsRouter;
