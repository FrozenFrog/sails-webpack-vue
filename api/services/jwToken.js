var jwt = require ("jsonwebtoken");
module.exports = {
  sign: function(payload) {
    return jwt.sign(
      {
        data: payload
      },
      sails.config.secret,
      { expiresIn: 86400 }
    ); // 24 hours
  },
  verify: function(token, callback) {
    return jwt.verify(token, sails.config.secret, callback);
  }
};
