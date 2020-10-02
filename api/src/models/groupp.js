const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('groupp', {
        name: {
            type: DataTypes.TEXT,
            allowNull: false,              
        },
    });
};