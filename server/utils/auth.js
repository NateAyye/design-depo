const jwt = require('jsonwebtoken');

const secret = 'mysecretgnbsncproject3';
const expiration = '250m';

module.exports = {
  signToken: function ({ email, name, _id }) {
    const payload = { email, name, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
