const User = require('../models/User');
const Color = require('../models/Colors');
const Gradients = require('../models/Gradients');
const Fonts = require('../models/Fonts');
const Palettes = require('../models/Palettes');
const Project = require('../models/Projects');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // User Queries
    Users: async () => await User.find(), // get all Users
    User: async (_, { id }) => await User.findById(id), // get User by id

    // Color Queries
    Colors: async () => await Color.find(), // get all Colors
    Color: async (_, { id }) => await Color.findById(id), // get Color by id
    UserColors: async (_, { userId }) => await Color.find({ userId: userId }), // get all Colors by userId

    // Gradients Queries
    Gradients: async () => await Gradients.find(), // Get all gradients
    Gradient: async (_, { id }) => await Gradients.findById(id), // Get gradient by ID
    UserGradients: async (_, { userId }) => await Gradients.find({ userId: userId }), // Get all gradients by userId

    // Font Queries
    Fonts: async () => await Fonts.find(), // Get all Fonts
    Font: async (_, { id }) => await Fonts.findById(id), // Get Font by ID

    // Palette Queries
    Palettes: async () => await Palettes.find(), // Get all Palettes
    Palette: async (_, { id }) => await Palettes.findById(id), // Get Palette by ID

    // Project Queries
    Projects: async () => await Project.find(),
    Project: async (_, { id }) => await Project.findById(id),

    GetUserItems: async (_, { userId }) => {
      console.log(userId);
      const projects = await Project.find({ userId: userId });
      const palettes = await Palettes.find({ userId: userId });
      const gradients = await Gradients.find({ userId: userId });
      const colors = await Color.find({ userId: userId });
      const fonts = await Fonts.find({ userId: userId });
      return { projects, palettes, gradients, colors, fonts };
    }
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
    createColor: async (_, { hexCode, name, userId }) => {
      const newColor = await Color.create({ hexCode, name, userId });
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
    updateColor: async (_, { id, ...args }) => {
      try {
        const updatedColor = await Color.findByIdAndUpdate(
          id,
          { ...args },
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
    createGradient: async (_, args) => {
      const newGradient = await Gradients.create(args);
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
    createFont: async (_, args) => {
      const newFont = await Fonts.create(args);
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
    updateFont: async (_, { id, ...args }) => {
      try {
        const updatedFont = await Fonts.findByIdAndUpdate(
          id,
          { ...args },
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


    // Palette mutations
    createPalette: async (_, args) => {
      const newPalette = await Palettes.create(args);
      return newPalette;
    },
    updatePalette: async (_, { id, ...args }) => {
      const updatedPalette = await Palettes.findByIdAndUpdate(id, args, { new: true });
      return updatedPalette;
    },
    deletePalette: async (_, { id }) => {
      const deletedPalette = await Palettes.findByIdAndDelete(id);
      return deletedPalette;
    },

    // Project mutations
    createProject: async (_, { userName, projectName }) => {
      const newProject = await Project.create({ userName, projectName });
      return newProject;
    },
    deleteProject: async (_, { id }) => {
      const deletedProject = await Project.findByIdAndDelete(id);
      return deletedProject;
    },
    updateProjectName: async (_, { id, newProjectName }) => {
      const updatedProject = await Project.findByIdAndUpdate(
        id,
        { projectName: newProjectName },
        { new: true }
      );
      return updatedProject;
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
  Project: {
    userName: async (parent) => {
      const user = await User.findById(parent.userName);
      return user;
    },
    palettes: async (parent) => {
      const palettes = await Palettes.find({ _id: { $in: parent.palettes } });
      return palettes;
    },
    gradients: async (parent) => {
      const gradients = await Gradients.find({ _id: { $in: parent.gradients } });
      return gradients;
    },
    colors: async (parent) => {
      const colors = await Color.find({ _id: { $in: parent.colors } });
      return colors;
    },
    fonts: async (parent) => {
      const fonts = await Fonts.find({ _id: { $in: parent.fonts } });
      return fonts;
    },
  },


};

module.exports = resolvers;
