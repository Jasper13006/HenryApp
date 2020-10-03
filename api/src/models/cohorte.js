const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('cohorte', {
        name: {
            type: DataTypes.TEXT,
            allowNull: false,            
        },
        date: {
            type: DataTypes.STRING,
            allowNull: true,
        } 
    });
};