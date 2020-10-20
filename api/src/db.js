require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const calendar = require('./models/calendar');
const privacy = require('./models/privacy');
const {  DB_USER, DB_PASSWORD, DB_HOST,} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/henryapp`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring


const { User, Feedback, Checkpoint, Cohorte, Grouppm, Modulo,Student,Groupp, Calendar, Privacy,Msg,Chat } = sequelize.models;


// Aca vendrian las relaciones
// Relaciones
Feedback.belongsTo(User, { as: 'to' }); //deberia agregar columna to a Feedback 
Feedback.belongsTo(User, { as: 'from' }); //deberia agregar columna from a Feedback 

Cohorte.belongsTo(User, { as: 'instructor' }) //deberia agregar columna instructor a Cohorte 

Grouppm.belongsTo(User, { as: 'PM1' }) // deberia agregar columna PM1 a Grouppm
Grouppm.belongsTo(User, { as: 'PM2' }) // deberia agregar columna PM2 a Grouppm
Grouppm.belongsTo(Cohorte) // deberia agregar columna cohorteId a group

Student.belongsTo(User) //deberia agregar columna userId a Student OK
Student.belongsTo(Cohorte) //deberia agregar columna cohorteId a Student OK
Student.belongsTo(Grouppm) //deberia agregar columna groupId a Student OK+

// Asociaciones Pair
Student.belongsTo(Groupp)
Groupp.belongsTo(Cohorte)
Groupp.belongsTo(Grouppm)

Checkpoint.belongsTo(User) // deberia agregar columna UserId a Checkpoint

Modulo.belongsTo(Cohorte)  // deberia agregar columna cohorteId a Modulo

Calendar.belongsTo(User)
Calendar.belongsTo(Cohorte)


Chat.belongsTo(User, { as: 'from' }) 
Chat.belongsTo(User, { as: 'to' }) 
Msg.belongsTo(Chat,{as:'chat'})
Msg.belongsTo(User, { as: 'from' }) 
Msg.belongsTo(User, { as: 'to' }) 

Privacy.belongsTo(User)


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
