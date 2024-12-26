const {
  REGISTRATION_SCHEMA,
  UPDATE_USER_SCHEMA,
} = require('../validation/userSchemas');

module.exports.registrationValidationMW = async (req, res, next) => {
  // console.log(req.body); // дані з тіла запиту

  //   REGISTRATION_SCHEMA.validate(req.body)
  //     .then((user) => {
  //       req.user = user;
  //       next();
  //     })
  //     .catch((error) => {
  //       res.send(error.message);
  //     });

  try {
    const user = await REGISTRATION_SCHEMA.validate(req.body);
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports.updateUserMW = async (req, res, next) => {
  try {
    const { body } = req;

    req.user = await UPDATE_USER_SCHEMA.validate(body);
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
}
