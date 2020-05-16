'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    username: {
      field: 'username',
      type: DataTypes.STRING,
      unique: {
        name: 'username',
        msg: 'Username is already taken'
      }
    },
    password: {
      field: 'password',
      type: DataTypes.STRING
    },
    email: {
      field: 'email',
      type: DataTypes.STRING
    },
    wage: {
      field: 'wage',
      type: DataTypes.REAL
    },
    role: {
      field: 'role',
      type: DataTypes.STRING
    },
    phoneNumber: {
      field: 'phoneNumber',
      type: DataTypes.STRING
    }
  }, {});
  users.associate = function (models) {
    // associations can be defined here
  };
  return users;
};
