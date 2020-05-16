'use strict';
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define('orders', {
    item: DataTypes.INTEGER,
    comments: DataTypes.STRING,
    price: DataTypes.REAL,
    status: DataTypes.STRING,
    tableId: DataTypes.INTEGER
  }, {});
  orders.associate = function (models) {
    // associations can be defined here
  };
  return orders;
};