let usersDb = [
  { id: 0, email: 'email1@gmail.com', password: '12345admin' },
  { id: 1, email: 'email2@gmail.com', password: 'sadsadsa' },
  { id: 2, email: 'email3@gmail.com', password: '423rfdf42d' },
  { id: 3, email: 'email4@gmail.com', password: 'dsac4354f' },
  { id: 4, email: 'email5@gmail.com', password: 'd4354fef' },
];

class User {

  static async findOne (id) {
    const user = usersDb.find((user) => user.id === id);
    return user;
  }

  static async findAll () {
    return usersDb;
  }

  static async create (userData) {
    const newUser = { ...userData };

    newUser.id = Date.now();
  
    usersDb.push(newUser);

    return newUser;
  }

  static async remove (id) {
    const foundUser = await User.findOne(id);

    if(foundUser) {
      usersDb = usersDb.filter((user) => user.id !== +id);
      return foundUser;
    } else {
      throw new Error('User not found');
    }
  }

  static async updateOne (id, dataToUpdate) {
    const foundUser = await User.findOne(id);

    if(foundUser) {
      let updatedUser;

      usersDb = usersDb.map((userInDb) => {
        if(userInDb.id === +id) {
          updatedUser = {
            ...userInDb,
            ...dataToUpdate
          }
  
          return updatedUser;
        }
  
        return userInDb;
      });

      return updatedUser;
    } else {
      throw new Error('User not found');
    }
  }
}


module.exports = User;