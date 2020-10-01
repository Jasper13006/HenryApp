const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define("user", {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        is: {
          args: ["^[a-zA-Z-,]+(s{0,1}[a-zA-Z-, ])*$"],
          msg: "Campo name - Debe ser una palabra",
        },
      },
    },
    lastName: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        is: {
          args: ["^[a-zA-Z-,]+(s{0,1}[a-zA-Z-, ])*$"],
          msg: "Campo apellido - Debe ser una palabra",
        },
      },
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: {
        args: true,
        message: "Email must be unique.",
      },
    //   validate: {
    //      isEmail: true,
    //    }, 
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },    
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    }, 
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    student: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    pm: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    instructor: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    image: {
      type: DataTypes.TEXT,
      defaultValue: 'https://www.ibm.com/blogs/systems/mx-es/wp-content/themes/ibmDigitalDesign/assets/img/anonymous.jpg'
    },      
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gitHubId: {
      type: DataTypes.STRING,
      allowNull: true,
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