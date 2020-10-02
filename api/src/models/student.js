const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('student', {
        groupPP: {
            type: DataTypes.INTEGER
        },
        
        estado: {
            type: DataTypes.ENUM('Cursando', 'No aplica', 'Reprobado','Egresado'),
            allowNull: false,
            defaultValue: 'Cursando'
        },
        migraciones: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    });
    
};