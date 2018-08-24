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
      required: true,
    },
  },

  exits: {
    invalid: {
      description: 'Invalid token',
    },
    success: {},
  },

  async fn(inputs, exits) {
    jwt
      .verify(inputs.token, sails.config.models.dataEncryptionKeys.default)
      .then(async (decoded) => {
        const user = await Users.findOne({ Username: decoded.data.Username });
        // check if user not in database for preventing hacking.
        if (!user) {
          return exits.invalid();
        }
        return exits.success();
      })
      .catch(() => exits.invalid());
  },
};
