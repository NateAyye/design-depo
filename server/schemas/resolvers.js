const { Profile } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    profiles: async () => await Profile.find(), // get all profiles
    profile: async (_, { id }) => await Profile.findById(id), // get profile by is
  },
  Mutation: {
    createProfile: async (_, { name, email, password }) => {
        const profile = await Profile.create({ name, email, password });
        const token = signToken(profile);
        return { token, profile };
      },
    updateProfileName: async (_, { id, newName }) => {
        const updatedProfile = await Profile.findByIdAndUpdate(id, { name: newName }, { new: true });
        return updatedProfile;
      },
    deleteProfile: async (_, { id }) => {
        return Profile.findOneAndDelete({ _id: id });
      },
    login: async (_, { email, password }) => {
        const profile = await Profile.findOne({ email });
  
        if (!profile) {
          throw new AuthenticationError('No profile with this email found!');
        }

        const correctPw = await profile.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect password!');
        }
  
        const token = signToken(profile);
        return { token, profile };
      },
  },
};

module.exports = resolvers;
