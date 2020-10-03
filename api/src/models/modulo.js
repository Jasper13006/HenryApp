const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("modulo", {
    name: {
      type: DataTypes.ENUM('0 - Prep', '1 - JS Foundations',
                           '2 - Frontend', '3 - Backend',
                           '4 - Base de datos', '5 - Henrylabs'),
      allowNull: false,
    },

    nameClass: {
      type: DataTypes.STRING,
      allowNull: false
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    curso: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: 'fullstack web developer'
    },

    linkVideos: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};