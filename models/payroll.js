'use strict';
module.exports = (sequelize, DataTypes) => {
  const payroll = sequelize.define('payroll', {
    userId: DataTypes.INTEGER,
    clockInTime: DataTypes.DATE,
    clockOutTime: DataTypes.DATE,
    hoursWorked: DataTypes.REAL,
    totalWage: DataTypes.REAL,
  }, {});
  payroll.associate = function (models) {
    // associate
  };
  return payroll;
};
