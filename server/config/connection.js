const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/..'); // add the DB name instead of dotes

module.exports = mongoose.connection;
