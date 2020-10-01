const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("checkpoint", {

        name: {
            type: DataTypes.ENUM('check1', 'check2', 'check3', 'check4')
        },

        qualification: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },

        info: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

    });
};