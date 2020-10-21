const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('calendar', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
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
        },
        startRecur: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        endRecur: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        startTime: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        endTime: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });
};