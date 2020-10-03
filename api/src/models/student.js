const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('student', {
                
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