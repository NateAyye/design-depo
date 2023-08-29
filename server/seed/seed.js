const db = require('../config/connection');
const User  = require('../models/User');
const userSeeds = require('./userSeeds.json');
const Color = require('../models/Colors');
const colorSeeds = require('./colorSeeds.json');
const Gradient =require('../models/Gradients');
const gradientSeeds = require('./gradientsSeeds.json');
const Fonts =require('../models/Fonts');
const fontSeeds = require('./fontSeeds.json');

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await User.create(userSeeds);
    await Color.deleteMany({});
    await Color.create(colorSeeds);
    await Gradient.deleteMany({});
    await Gradient.create(gradientSeeds);
    await Fonts.deleteMany({});
    await Fonts.create(fontSeeds);


    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
