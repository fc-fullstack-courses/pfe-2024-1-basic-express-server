const yup = require('yup');

module.exports.REGISTRATION_SCHEMA = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .matches(/^.{8,32}$/, 'enter valid password')
    .required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  age: yup.number(),
});
