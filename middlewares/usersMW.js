const { REGISTRATION_SCHEMA } = require("../validation/userSchemas");

module.exports.registrationValidationMW = (req, res, next) => {
  // console.log(req.body); // дані з тіла запиту

  REGISTRATION_SCHEMA.validate(req.body)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((error) => {
      res.send(error.message);
    });
}