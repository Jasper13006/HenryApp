const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('grouppm', {
        name: {
            type: DataTypes.TEXT,
            allowNull: false,              
        },
        // students: {
        //      type: DataTypes.ARRAY(DataTypes.INTEGER), // array de usuarios (id's)
        //  }, 
    });
};