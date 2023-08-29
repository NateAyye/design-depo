const  User  = require('../models/User');
const Color = require('../models/Colors');
const Gradients = require('../models/Gradients');
const Fonts = require('../models/Fonts');
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

    // Font Queries
    Fonts: async () => await Fonts.find(), // Get all Fonts
    Font: async (_, { id }) => await Fonts.findById(id), // Get Font by ID
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

    // Grafient mutations
    createGradient: async (_, { gradientName, color }) => {
        const newGradient = await Gradients.create({gradientName,color,});
        //await newGradient.save();
        return newGradient;
      },
    updateGradient: async (_, { id, gradientName, color }) => {
        try {
          const updatedGradient = await Gradients.findByIdAndUpdate(
            id,
            { gradientName, color },
            { new: true }
          );
          if (!updatedGradient) {
            throw new Error('Gradient not found');
          }
          return updatedGradient;
        } catch (error) {
          throw error;
        }
      },
    deleteGradient: async (_, { id }) => {
        try {
          const deletedGradient = await Gradients.findByIdAndDelete(id);
          if (!deletedGradient) {
            throw new Error('Gradient not found');
          }
          return deletedGradient;
        } catch (error) {
          throw error;
        }
      },
    createFont: async (_, { activeFontFamily }) => {
        const newFont = await Fonts.create({
          activeFontFamily,
        });
        //await newFont.save();
        return newFont;
      },
    deleteFont: async (_, { id }) => {
        try {
          const deletedFont = await Fonts.findByIdAndDelete(id);
          if (!deletedFont) {
            throw new Error('Font not found');
          }
          return deletedFont;
        } catch (error) {
          throw error;
        }
      },  
    updateFont: async (_, { id, activeFontFamily }) => {
        try {
          const updatedFont = await Fonts.findByIdAndUpdate(
            id,
            { activeFontFamily },
            { new: true }
          );
          if (!updatedFont) {
            throw new Error('Font not found');
          }
          return updatedFont;
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
