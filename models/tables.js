'use strict';
module.exports = (sequelize, DataTypes) => {
  const tables = sequelize.define('tables', {
    total: DataTypes.REAL,
    waiterId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {});
  tables.associate = function (models) {
    // associations can be defined here
  };
  return tables;
};