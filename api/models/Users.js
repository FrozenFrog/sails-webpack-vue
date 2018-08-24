/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'Users',
  attributes: {
    id: { type: 'string', columnName: '_id' },
    username: {
      type: 'string',
      unique: true,
      required: true,
    },
    encryptedPassword: {
      type: 'string',
      required: true,
    },
    phoneNumber: {
      type: 'string',
      allowNull: true,
    },
    emailAddress: {
      type: 'string',
      unique: true,
      allowNull: true,
    },
    role: {
      type: 'json',
      required: true,
      isNotEmptyString: true,
      columnType: 'array',
    },
    banned: {
      type: 'boolean',
      defaultsTo: false,
    },
    base64Avatar: {
      type: 'string',
      allowNull: true,
    },
  },
  customToJSON() {
    // Return a shallow copy of this record with the pick selected.
    return _.pick(this, ['username', 'role', 'base64Avatar']);
  },
};
