const db = require('../config/connection');
const User  = require('../models/User');
const userSeeds = require('./userSeeds.json');
const Color = require('../models/Colors');
const colorSeeds = require('./colorSeeds.json');

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await User.create(userSeeds);
    await Color.deleteMany({});
    await Color.create(colorSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
