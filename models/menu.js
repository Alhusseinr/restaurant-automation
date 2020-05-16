'use strict';
module.exports = (sequelize, DataTypes) => {
  const menu = sequelize.define('menu', {
    item: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
     type: DataTypes.STRING,
     allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});
  menu.associate = function(models) {
    // associations can be defined here
  };
  return menu;
};