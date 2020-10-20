const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("msg", {
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    
  });
  sequelize.define('chat', {
    check:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:false
    }
  })
};