'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('payrolls', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clockInTime: {
        type: Sequelize.DATE,
        allowNull: false
      },
      clockOutTime: {
        type: Sequelize.DATE,
        allowNull: true
      },
      hoursWorked: {
        type: Sequelize.REAL,
        allowNull: true
      },
      totalWage: {
        type: Sequelize.REAL,
        allowNull: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('payrolls');
  }
};
