let users = [
  { id: 0, email: 'email1@gmail.com', password: '12345admin' },
  { id: 1, email: 'email2@gmail.com', password: 'sadsadsa' },
  { id: 2, email: 'email3@gmail.com', password: '423rfdf42d' },
  { id: 3, email: 'email4@gmail.com', password: 'dsac4354f' },
  { id: 4, email: 'email5@gmail.com', password: 'd4354fef' },
];

module.exports.getUsers = async (request, response) => {
  response.send(users);
};

module.exports.getUser = async (req, res) => {
  const { params: { userId }} = req;

  const user = users.find((user) => user.id === +userId);
  res.send(user);
}

module.exports.createUser = async (req, res, next) => {
  const newUser = { ...req.user };

  newUser.id = Date.now();

  users.push(newUser);

  const { password, ...preparedUser } = newUser;

  res.send(preparedUser);
}

module.exports.deleteUser = async (req, res) => {
  const {params: {userId}} = req;

  const user = users.find((user) => user.id === +userId);

  if(user) {
    users = users.filter((user) => user.id !== +userId);
    res.send(user);
  } else {
    res.send('User not exist');
  }
}

module.exports.updateUser = async (req, res) => {
  const { user, params: {userId}} = req;

  const foundUser = users.find((user) => user.id === +userId);

  if(foundUser) {
    let updatedUser;
    users = users.map((userInDb) => {
      if(userInDb.id === +userId) {
        updatedUser = {
          ...userInDb,
          ...user
        }

        return updatedUser;
      }

      return userInDb;
    });

    res.send(updatedUser);
  } else {
    res.send('User not exist');
  }
}
