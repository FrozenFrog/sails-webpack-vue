/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'User',
  datastore: 'mongoDB',
  attributes: {
    id: { type: 'string', columnName: '_id' },
    username: {
      type: 'string',
      unique: true,
      required: true
    },
    hashPassword: {
      type: 'string',
      required: true
    },
    phoneNumber: {
      type: 'string',
      allowNull: true
    },
    emailAddress: {
      type: 'string',
      unique: true,
      isEmail: true,
      allowNull: true
    },
    banned: {
      type: 'boolean',
      defaultsTo: false,
      isBoolean: true
    }
  }
};
