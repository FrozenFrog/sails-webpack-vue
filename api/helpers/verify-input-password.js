const bcrypt = require('bcryptjs');

module.exports = {
  friendlyName: 'Verify input password',

  description:
    'Using this helper to verify login password match dbPassword which has been encrypted in database',

  inputs: {
    plainPassword: {
      type: 'string',
      required: true,
    },
    dbPassword: {
      type: 'string',
      required: true,
    },
  },

  exits: {},

  async fn(inputs, exits) {
    const result = await bcrypt.compare(
      inputs.plainPassword,
      inputs.dbPassword
    );
    return exits.success(result);
  },
};
