const  User  = require('../models/User');
const Color = require('../models/Colors');
const Gradients = require('../models/Gradients');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // User Queries
    Users: async () => await User.find(), // get all Users
    User: async (_, { id }) => await User.findById(id), // get User by id

    // Color Queries
    Colors: async () => await Color.find(), // get all Colors
    Color: async (_, { id }) => await Color.findById(id), // get Color by id

    // Gradients Queries
    Gradients: async () => await Gradients.find(), // Get all gradients
    Gradient: async (_, { id }) => await Gradients.findById(id), // Get gradient by ID
  },
  Mutation: {
    // User Mutations 

    createUser: async (_, { name, email, password }) => {
        const newUser = await User.create({ name, email, password });
        const token = signToken(newUser);
        return { token, newUser };
      },
    updateUserName: async (_, { id, newName }) => {
        const updatedUser = await User.findByIdAndUpdate(id, { name: newName }, { new: true });
        return updatedUser;
      },
    deleteUser: async (_, { id }) => {
        return User.findOneAndDelete({ _id: id });
      },
    login: async (_, { email, password }) => {
        const currentUser = await User.findOne({ email });
  
        if (!currentUser) {
          throw new AuthenticationError('No User with this email found!');
        }

        const correctPw = await currentUser.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect password!');
        }
  
        const token = signToken(currentUser);
        return { token, currentUser };
      },
    
      // Colors Mutations
      createColor: async (_, { hexCode }) => {
        const newColor = await Color.create({hexCode,});
        //await newColor.save();
        return newColor;
      },
      deleteColor: async (_, { id }) => {
        try {
          const deletedColor = await Color.findByIdAndDelete(id);
          if (!deletedColor) {
            throw new Error('Color not found');
          }
          return deletedColor;
        } catch (error) {
          throw error;
        }
      },
      updateColor: async (_, { id, hexCode }) => {
        try {
          const updatedColor = await Color.findByIdAndUpdate(
            id,
            { hexCode },
            { new: true }
          );
          if (!updatedColor) {
            throw new Error('Color not found');
          }
          return updatedColor;
        } catch (error) {
          throw error;
        }
      },        
    },
    Color: {
      references: async (parent) => {
        try {
          const countMessage = await Color.countReferences(parent.hexCode);
          return countMessage;
        } catch (error) {
          throw error;
        }
      },
    },

};

module.exports = resolvers;
