const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('privacy', {
        emailP: {
            type: DataTypes.ENUM('henry','cohorte','todos'),
            allowNull: false,
            defaultValue: 'henry',
        },
        onLineStatus: {
            type: DataTypes.ENUM('henry','cohorte','todos'),
            allowNull: false,
            defaultValue: 'henry',
        },
        gitHub: {
            type: DataTypes.ENUM('henry','cohorte','todos'),
            allowNull: false,
            defaultValue: 'henry',
        },
        linkedIn: {
            type: DataTypes.ENUM('henry','cohorte','todos'),
            allowNull: false,
            defaultValue: 'henry',
        },
    });
};