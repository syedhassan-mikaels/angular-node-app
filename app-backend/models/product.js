'use strict';

const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.STRING,
        get() {
          return moment(this.getDataValue('created_at')).format('yy-MM-DD');
        },
      },
    },
    {
      tableName: 'product',
      timestamps: false,
    }
  );
  return Product;
};
