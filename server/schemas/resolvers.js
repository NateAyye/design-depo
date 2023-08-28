const  User  = require('../models/User');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    Users: async () => await User.find(), // get all Users
    User: async (_, { id }) => await User.findById(id), // get User by is
  },
  Mutation: {
    createUser: async (_, { name, email, password }) => {
        const User = await User.create({ name, email, password });
        const token = signToken(User);
        return { token, User };
      },
    updateUserName: async (_, { id, newName }) => {
        const updatedUser = await User.findByIdAndUpdate(id, { name: newName }, { new: true });
        return updatedUser;
      },
    deleteUser: async (_, { id }) => {
        return User.findOneAndDelete({ _id: id });
      },
    login: async (_, { email, password }) => {
        const User = await User.findOne({ email });
  
        if (!User) {
          throw new AuthenticationError('No User with this email found!');
        }

        const correctPw = await User.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect password!');
        }
  
        const token = signToken(User);
        return { token, User };
      },
  },
};

module.exports = resolvers;
