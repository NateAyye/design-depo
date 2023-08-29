const db = require('../config/connection');
const User  = require('../models/User');
const userSeeds = require('./userSeeds.json');
const Color = require('../models/Colors');
const colorSeeds = require('./colorSeeds.json');
const Gradient =require('../models/Gradients');
const gradientSeeds = require('./gradientsSeeds.json');

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await User.create(userSeeds);
    await Color.deleteMany({});
    await Color.create(colorSeeds);
    await Gradient.deleteMany({});
    await Gradient.create(gradientSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
