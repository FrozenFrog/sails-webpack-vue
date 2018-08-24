const jwt = require('jwt-then');

module.exports = {
  friendlyName: 'Jw token sign',

  description: '',

  inputs: {
    userQuery: {
      type: 'ref',
      required: true,
    },
  },

  exits: {},

  async fn(inputs, exits) {
    // To understand more about jwt sign
    // read https://medium.com/vandium-software/5-easy-steps-to-understanding-json-web-tokens-jwt-1164c0adfcec
    const token = await jwt.sign(
      {
        data: inputs.userQuery,
      },
      sails.config.models.dataEncryptionKeys.default,
      { expiresIn: 86400 } // 7 days
    );
    return exits.success(token);
  },
};
