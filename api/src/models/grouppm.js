const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('grouppm', {
        name: {
            type: DataTypes.TEXT,
            allowNull: false,              
        },
        groupPP: {
            type: DataTypes.INTEGER, // numero grupo pair
        },
    });
};