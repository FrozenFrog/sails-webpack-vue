const jwt = require('jsonwebtoken');
module.exports = {
  friendlyName: 'Jw token sign',

  description: '',

  inputs: {
    userQuery: {
      type: 'ref',
      required: true
    }
  },

  exits: {},

  fn: async function(inputs, exits) {
    // To understand more about jwt sign
    // read https://medium.com/vandium-software/5-easy-steps-to-understanding-json-web-tokens-jwt-1164c0adfcec
    const userQuery = inputs.userQuery;
    const token = jwt.sign(
      {
        data: userQuery
      },
      sails.config.dataEncryptionKeys.default,
      { expiresIn: 86400 } // 7 days
    );
    return exits.success(token);
  }
};
