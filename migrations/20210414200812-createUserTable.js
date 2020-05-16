'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        field: 'username',
        type: Sequelize.STRING,
        unique: {
          name: 'username',
          msg: 'Email is already taken'
        }
      },
      password: {
        field: 'password',
        type: Sequelize.STRING
      },
      wage: {
        field: 'wage',
        type: Sequelize.REAL
      },
      email: {
        field: 'email',
        type: Sequelize.STRING
      },
      role: {
        field: 'role',
        type: Sequelize.STRING
      },
      phoneNumber: {
        field: 'phoneNumber',
        type: Sequelize.STRING
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
