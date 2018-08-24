/**
 * Items.js
 *    Wanna using itemID like id in mongodb but failed
    https://stackoverflow.com/questions/30974690/how-to-overwrite-object-ids-in-mongo-db-while-creating-an-app-in-sails
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 *
 * If user delete a item, make deleted attributes to true, do not delete it permantly
 */

module.exports = {
  tableName: 'Items',
  attributes: {
    itemName: {
      type: 'string',
      required: true,
    },
    itemPrice: {
      type: 'number',
      required: true,
      isInteger: true,
      min: 1000,
      columnType: 'long',
    },
    imgBase64Data: {
      type: 'string',
      allowNull: false,
    },
    deleted: {
      type: 'boolean',
      defaultsTo: false,
    },
  },
  customToJSON() {
    return _.omit(this, ['deleted']);
  },
};
