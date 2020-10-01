const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("feedback", {
    qualification: {
      type: DataTypes.INTEGER, // o array de textos [tech:5, soft: 4, social:3, rating:4]
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    position: {
      type: DataTypes.ENUM('instructor', 'PM', 'pair', 'TL'),
      defaultValue: 'pair'
    }
  });
};
