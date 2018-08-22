const jwt = require("jsonwebtoken");
module.exports = {
  friendlyName: "Jw token sign",

  description: "",

  inputs: {
    userQuery: {
      type: "ref",
      required: true
    }
  },

  exits: {},

  fn: async function(inputs, exits) {
    const userQuery = inputs.userQuery;
    const token = jwt.sign(
      {
        data: userQuery
      },
      sails.config.secret,
      { expiresIn: 86400 }
    );
    return exits.success(token);
  }
};
