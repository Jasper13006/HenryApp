const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("msg", {
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
};