const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('calendar', {
        title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        start: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        end: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        allDay: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        }
    });
};