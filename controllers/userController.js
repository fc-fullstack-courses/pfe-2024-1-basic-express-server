const users = [
  { id: 0, email: 'email1@gmail.com', password: '12345admin' },
  { id: 1, email: 'email2@gmail.com', password: 'sadsadsa' },
  { id: 2, email: 'email3@gmail.com', password: '423rfdf42d' },
  { id: 3, email: 'email4@gmail.com', password: 'dsac4354f' },
  { id: 4, email: 'email5@gmail.com', password: 'd4354fef' },
];

module.exports.getUsers = async (request, response) => {
  response.send(users);
};

module.exports.createUser = async (req, res, next) => {
  const newUser = { ...req.user };

  newUser.id = Date.now();

  users.push(newUser);

  const { password, ...preparedUser } = newUser;

  res.send(preparedUser);
}