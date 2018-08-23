const jwt = require('jwt-then');
module.exports = {
  friendlyName: 'Jw token verify',

  description: 'Get the token string and verify it',
  inputs: {
    token: {
      type: 'string',
      friendlyName: 'token to verify',
      description: `Một token chia là ba phần header.payload.hash,
        trong đó hash là cái đề sails.config.secret verify xem có giống lúc sign không`,
      required: true
    }
  },

  exits: {
    invalid: {
      description: 'Invalid token'
    },
    success: {}
  },

  fn: async function(inputs, exits) {
    jwt
      .verify(inputs.token, sails.config.dataEncryptionKeys.default)
      .then(async decoded => {
        const user = await User.findOne({ Username: decoded.data.Username });
        // check if user not in database for preventing hacking.
        if (!user) {
          return exits.invalid();
        }
        return exits.success();
      })
      .catch(() => {
        return exits.invalid();
      });
  }
};
