const express = require("express");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const { User, Cohorte, Grouppm, Student, Groupp, Checkpoint, Calendar, Modulo } = require("./db.js")
const server = express();
const createUsers = require('./controllers/createUsers');
const { generateUsers } = require("./controllers/createUsers");
server.name = "API";



createUsers.generateUsers()

// createUsers.generateUsers(1450)

createUsers.generateUsers(1000)

server.use(fileUpload({ useTempFiles: true }));
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

server.use("/", routes);

server.post("/seed", async (req, res) => {
  const passwordInit = "12345678"
  //////////// USUARIOS //////////////////// el id 1 es el admin creado en el front
  const admin = await User.create({  //id: 2
    "email": "jordi@soyhenry.com",
    "password": passwordInit,
    "name": "Jordi",
    "lastName": "Rojas",
    "admin": true,
    "instructor": true,
    "student": false,
  })
  const instructor = await User.create({ //id: 3
    "email": "emi@soyhenry.com",
    "password": passwordInit,
    "name": "Emi",
    "lastName": "Chequer",
    "instructor": true,
    "student": false,
  })
  const instructor2 = await User.create({ //id: 4
    "email": "oliver@soyhenry.com",
    "password": passwordInit,
    "name": "Oliver",
    "lastName": "Balfour",
    "instructor": true,
    "student": false,
  })
  const pm1 = await User.create({ //id: 5
    "email": "maria@soyhenry.com",
    "password": passwordInit,
    "name": "Maria de la Paz",
    "lastName": "Casaux",
    "pm": true,
  })
  const pm2 = await User.create({ //id: 6
    "email": "victoria@soyhenry.com",
    "password": passwordInit,
    "name": "Victoria",
    "lastName": "Cabrera",
    "pm": true,
  })
  const pm3 = await User.create({ //id: 7
    "email": "elena@soyhenry.com",
    "password": passwordInit,
    "name": "Elena",
    "lastName": "Gonzalez",
    "pm": true,
  })
  const pm4 = await User.create({ //id: 8
    "email": "fabio@soyhenry.com",
    "password": passwordInit,
    "name": "Fabio",
    "lastName": "Arganaraz",
    "pm": true,
  })
  const alum0 = await User.create({ //id: 9
    "email": "jeremias@soyhenry.com",
    "password": passwordInit,
    "name": "Jeremias",
    "lastName": "Koch",
  })
  const alum1 = await User.create({ //id: 10
    "email": "cecilia@soyhenry.com",
    "password": passwordInit,
    "name": "Cecilia",
    "lastName": "Hansen",
  })
  const alum2 = await User.create({ //id: 11
    "email": "cesar@soyhenry.com",
    "password": passwordInit,
    "name": "Cesar",
    "lastName": "Sanchez",
  })
  const alum3 = await User.create({ //id: 12
    "email": "pablo@soyhenry.com",
    "password": passwordInit,
    "name": "Pablo",
    "lastName": "Lezcano",
  })
  const alum4 = await User.create({ //id: 13
    "email": "matias@soyhenry.com",
    "password": passwordInit,
    "name": "Matias",
    "lastName": "Ruiz",
  })
  const alum5 = await User.create({ //id: 14
    "email": "agustin@soyhenry.com",
    "password": passwordInit,
    "name": "Agustin",
    "lastName": "Mineto",
  })
  const alum6 = await User.create({ //id: 15
    "email": "nicolas@soyhenry.com",
    "password": passwordInit,
    "name": "Nicolas",
    "lastName": "Caillet",
  })
  const alum7 = await User.create({ //id: 16
    "email": "agustina1@soyhenry.com",
    "password": passwordInit,
    "name": "Agustina",
    "lastName": "Grimaldi",
  })
  const alum8 = await User.create({ //id: 17
    "email": "agustinar8@soyhenry.com",
    "password": passwordInit,
    "name": "Agustina",
    "lastName": "Rojas",
  })
  const alum9 = await User.create({ //id: 18
    "email": "albertop@soyhenry.com",
    "password": passwordInit,
    "name": "Alberto",
    "lastName": "Popelka",
  })
  const alum10 = await User.create({ //id: 19
    "email": "carlosm@soyhenry.com",
    "password": passwordInit,
    "name": "carlos",
    "lastName": "Miceli",

  })
  const alum11 = await User.create({ //id: 20
    "email": "ignaciov@soyhenry.com",
    "password": passwordInit,
    "name": "Ignacio",
    "lastName": "Videla",
  })
  const alum12 = await User.create({ //id: 21
    "email": "gustavoa@soyhenry.com",
    "password": passwordInit,
    "name": "Gustavo",
    "lastName": "Altamiranda",
  })
  const alum13 = await User.create({ //id: 22
    "email": "amancay@soyhenry.com",
    "password": passwordInit,
    "name": "Amancay",
    "lastName": "Ceresola",

  })
  const alum14 = await User.create({ //id: 23
    "email": "andrea1@soyhenry.com",
    "password": passwordInit,
    "name": "Andrea",
    "lastName": "Zomoza",
  })
  const alum15 = await User.create({ //id: 24
    "email": "angelo@soyhenry.com",
    "password": passwordInit,
    "name": "Angelo",
    "lastName": "Sedler",
  })
  const alum16 = await User.create({ //id: 25
    "email": "ariel@soyhenry.com",
    "password": passwordInit,
    "name": "Ariel",
    "lastName": "Penna",
  })
  const alum17 = await User.create({ //id: 26
    "email": "arielr@soyhenry.com",
    "password": passwordInit,
    "name": "Ariel",
    "lastName": "Tecay",
  })
  const alum18 = await User.create({ //id: 27
    "email": "ayelen@soyhenry.com",
    "password": passwordInit,
    "name": "Ayelen",
    "lastName": "Villaruel",
  })
  const alum19 = await User.create({ //id: 28
    "email": "bautista@soyhenry.com",
    "password": passwordInit,
    "name": "Bautista",
    "lastName": "Di Benedetto",
  })
  const alum20 = await User.create({ //id: 29
    "email": "carlosj@soyhenry.com",
    "password": passwordInit,
    "name": "Carlos",
    "lastName": "Hernandez",
  })
  const alum21 = await User.create({ //id: 30
    "email": "claudio@soyhenry.com",
    "password": passwordInit,
    "name": "Claudio",
    "lastName": "Martinez",
  })
  const alum22 = await User.create({ //id: 31
    "email": "cristobal@soyhenry.com",
    "password": passwordInit,
    "name": "Cristobal",
    "lastName": "Carrasco",
  })
  const alum23 = await User.create({ //id: 32
    "email": "danielag@soyhenry.com",
    "password": passwordInit,
    "name": "Daniela",
    "lastName": "Gomez",
  })
  const alum24 = await User.create({ //id: 33
    "email": "dario@soyhenry.com",
    "password": passwordInit,
    "name": "Dario",
    "lastName": "Nunez",
  })
  const alum25 = await User.create({ //id: 34
    "email": "dayamar@soyhenry.com",
    "password": passwordInit,
    "name": "Dayamar",
    "lastName": "Martinez",
  })
  const alum26 = await User.create({ //id: 35
    "email": "emilianoc@soyhenry.com",
    "password": passwordInit,
    "name": "Emiliano",
    "lastName": "Cobelas",
  })
  const alum27 = await User.create({ //id: 36
    "email": "ezequield@soyhenry.com",
    "password": passwordInit,
    "name": "Ezequiel",
    "lastName": "Diaz",
  })
  const alum28 = await User.create({ //id: 37
    "email": "facundo@soyhenry.com",
    "password": passwordInit,
    "name": "Facundo",
    "lastName": "Uriona",
  })
  const alum29 = await User.create({ //id: 38
    "email": "facundor@soyhenry.com",
    "password": passwordInit,
    "name": "Facundo",
    "lastName": "Rivadero",
  })
  const alum30 = await User.create({ //id: 39
    "email": "facundos@soyhenry.com",
    "password": passwordInit,
    "name": "Facundo",
    "lastName": "Sadava",
  })
  const alum31 = await User.create({ //id: 40
    "email": "federico@soyhenry.com",
    "password": passwordInit,
    "name": "Federico",
    "lastName": "Uanini",
  })
  const alum32 = await User.create({ //id: 41
    "email": "fernandoc@soyhenry.com",
    "password": passwordInit,
    "name": "Fernando",
    "lastName": "Checchi",
  })
  const alum33 = await User.create({ //id: 42
    "email": "flamencip@soyhenry.com",
    "password": passwordInit,
    "name": "Pablo",
    "lastName": "Flamenci",
  })
  const alum34 = await User.create({ //id: 43
    "email": "armandog@soyhenry.com",
    "password": passwordInit,
    "name": "Armando",
    "lastName": "Guerrero",
  })
  const alum35 = await User.create({ //id: 44
    "email": "emiliac@soyhenry.com",
    "password": passwordInit,
    "name": "Emilia",
    "lastName": "Cabral",
  })
  const alum36 = await User.create({ //id: 45
    "email": "chantal@henryapp.com",
    "password": passwordInit,
    "name": "Kelm",
    "lastName": "Chantal",
  })
  const alum37 = await User.create({ //id: 46
    "email": "chris@henryapp.com",
    "password": passwordInit,
    "name": "Christian",
    "lastName": "Manzaraz",
  })
  const alum38 = await User.create({ //id: 47
    "email": "ciro@henryapp.com",
    "password": passwordInit,
    "name": "Ciro",
    "lastName": "Escola",
  })
  const alum39 = await User.create({ //id: 48
    "email": "clara@gmail.com",
    "password": passwordInit,
    "name": "Clara",
    "lastName": "Sanchez",
  })
  const alum40 = await User.create({ //id: 49
    "email": "clau@henryapp.com",
    "password": passwordInit,
    "name": "Claudio",
    "lastName": "Romano",
  })
  const alum41 = await User.create({ //id: 50
    "email": "ema@henryapp.com",
    "password": passwordInit,
    "name": "Emanuel",
    "lastName": "Sarco",
  })
  const alum42 = await User.create({ //id: 51
    "email": "Eric@henryapp.com",
    "password": passwordInit,
    "name": "Eric",
    "lastName": "Gomez",
  })
  const alum43 = await User.create({ //id: 52
    "email": "lean@henryapp.com",
    "password": passwordInit,
    "name": "Leandro",
    "lastName": "Alvarez",
  })
  const alum44 = await User.create({ //id: 53
    "email": "Lara@henryapp.com",
    "password": passwordInit,
    "name": "Lara",
    "lastName": "Pontura",
  })
  const alum45 = await User.create({ //id: 54
    "email": "leo@henryapp.com",
    "password": passwordInit,
    "name": "Leonardo",
    "lastName": "Rufino",
  })
  const alum46 = await User.create({ //id: 55
    "email": "lucas@henryapp.com",
    "password": passwordInit,
    "name": "Lucas",
    "lastName": "Casco",
  })
  const alum47 = await User.create({ //id: 56
    "email": "lucca@gmail.com",
    "password": passwordInit,
    "name": "Lucca",
    "lastName": "Lipisky",
  })
  const alum48 = await User.create({ //id: 57
    "email": "lucia@henryapp.com",
    "password": passwordInit,
    "name": "Lucia",
    "lastName": "Gentile",
  })
  const alum49 = await User.create({ //id: 58
    "email": "jcheruse@henryapp.com",
    "password": passwordInit,
    "name": "Julieta",
    "lastName": "Cheruse",
  })
  const alum50 = await User.create({ //id: 59
    "email": "lucianoc@henryapp.com",
    "password": passwordInit,
    "name": "Luciano",
    "lastName": "Castet",
  })
  const alum51 = await User.create({ //id: 60
    "email": "luisd@henryapp.com",
    "password": passwordInit,
    "name": "Luis",
    "lastName": "DAmico",
  })
  const alum52 = await User.create({ //id: 61
    "email": "luisj@henryapp.com",
    "password": passwordInit,
    "name": "Luis",
    "lastName": "Jacobi",
  })
  const alum53 = await User.create({ //id: 62
    "email": "mjc@henryapp.com",
    "password": passwordInit,
    "name": "M Angel",
    "lastName": "JC",
  })
  const alum54 = await User.create({ //id: 63
    "email": "marc@henryapp.com",
    "password": passwordInit,
    "name": "Marcelo",
    "lastName": "Britos",
  })
  const alum55 = await User.create({ //id: 64
    "email": "valle@henryapp.com",
    "password": passwordInit,
    "name": "Marcelo",
    "lastName": "Del Valle",
  })
  const alum56 = await User.create({ //id: 65
    "email": "aliaga@henryapp.com",
    "password": passwordInit,
    "name": "Marcelo",
    "lastName": "Aliaga",
  })
  const alum57 = await User.create({ //id: 66
    "email": "marcc@henryapp.com",
    "password": passwordInit,
    "name": "Marcelo",
    "lastName": "Campana",
  })
  const alum58 = await User.create({ //id: 67
    "email": "piccato@soyhenry.com",
    "password": passwordInit,
    "name": "Martin",
    "lastName": "Piccato",
  })
  const alum59 = await User.create({ //id: 68
    "email": "student59@gmail.com",
    "password": passwordInit,
    "name": "Student",
    "lastName": "It59",
  })
  const alum60 = await User.create({ //id: 69
    "email": "student60@gmail.com",
    "password": passwordInit,
    "name": "Student",
    "lastName": "It60",
  })
  const alum61 = await User.create({ //id: 70
    "email": "student61@gmail.com",
    "password": passwordInit,
    "name": "Student",
    "lastName": "It61",
  })
  const alum62 = await User.create({ //id: 71
    "email": "student62@gmail.com",
    "password": passwordInit,
    "name": "Student",
    "lastName": "It62",
  })
  const alum63 = await User.create({ //id: 72
    "email": "student63@gmail.com",
    "password": passwordInit,
    "name": "Student",
    "lastName": "It63",
  })
  const alum64 = await User.create({ //id: 73
    "email": "student64@gmail.com",
    "password": passwordInit,
    "name": "Student",
    "lastName": "It64",
  })
  const alum65 = await User.create({ //id: 74
    "email": "student65@gmail.com",
    "password": passwordInit,
    "name": "Student",
    "lastName": "It65",
  })
  const alum66 = await User.create({ //id: 75
    "email": "student66@gmail.com",
    "password": passwordInit,
    "name": "Student",
    "lastName": "It66",
  })
  const alum67 = await User.create({ //id: 76
    "email": "student67@gmail.com",
    "password": passwordInit,
    "name": "Student",
    "lastName": "It67",
  })
  const alum68 = await User.create({ //id: 77
    "email": "student68@gmail.com",
    "password": passwordInit,
    "name": "Student",
    "lastName": "It68",
  })
  const alum69 = await User.create({ //id: 78
    "email": "student69@gmail.com",
    "password": passwordInit,
    "name": "Student",
    "lastName": "It69",
  })
  const alum70 = await User.create({ //id: 79
    "email": "student70@gmail.com",
    "password": passwordInit,
    "name": "Student",
    "lastName": "It70",
  })
  const alum71 = await User.create({ //id: 80
    "email": "student71@gmail.com",
    "password": passwordInit,
    "name": "Student",
    "lastName": "It71",
  })
  const alum72 = await User.create({ //id: 81
    "email": "student72@gmail.com",
    "password": passwordInit,
    "name": "Student",
    "lastName": "It72",
  })
  const alum73 = await User.create({ //id: 82
    "email": "student73@gmail.com",
    "password": passwordInit,
    "name": "Student",
    "lastName": "It73",
  })
  const alum74 = await User.create({ //id: 83
    "email": "student74@gmail.com",
    "password": passwordInit,
    "name": "Student",
    "lastName": "It74",
  })
  const alum75 = await User.create({ //id: 84
    "email": "student75@gmail.com",
    "password": passwordInit,
    "name": "Student",
    "lastName": "It75",
  })
  const alum76 = await User.create({ //id: 85
    "email": "student76@gmail.com",
    "password": passwordInit,
    "name": "Student",
    "lastName": "It76",
  })
  const alum77 = await User.create({ //id: 86
    "email": "student77@gmail.com",
    "password": passwordInit,
    "name": "Student",
    "lastName": "It77",
  })
  const alum78 = await User.create({ //id: 87
    "email": "student78@gmail.com",
    "password": passwordInit,
    "name": "Student",
    "lastName": "It78",
  })
  const alum79 = await User.create({ //id: 87
    "email": "jslugo235@gmail.com",
    "password": 'Henry1234',
    "name": "jhoan",
    "lastName": "Lugo",
  })
  /////////////// COHORTES ////////////////
  const cohorte1 = await Cohorte.create({
    "name": "webft01",
    "date": "09-11-2020",
    "instructorId": 3
  })
  const cohorte2 = await Cohorte.create({
    "name": "webft02",
    "date": "09-12-2020",
    "instructorId": 4
  })
  ///////////// CREAR GRUPOS PM//////////
  //cohorte1
  const grouppm1 = await Grouppm.create({
    "name": "webft01Groupm01",
    "PM1Id": 5,
    "PM2Id": 6,
    "cohorteId": 1
  })
  const grouppm2 = await Grouppm.create({
    "name": "webft01Groupm02",
    "PM1Id": 7,
    "PM2Id": 8,
    "cohorteId": 1
  })
  //cohorte2
  const grouppm3 = await Grouppm.create({
    "name": "webft02Groupm01",
    "PM1Id": 5,
    "PM2Id": 6,
    "cohorteId": 2
  })
  const grouppm4 = await Grouppm.create({
    "name": "webft02Groupm02",
    "PM1Id": 7,
    "PM2Id": 8,
    "cohorteId": 2
  })
  ///////////// CREAR GRUPOS PP//////////
  //cohorte1
  const groupp1 = await Groupp.create({
    "name": "Groupp01",
    "grouppmId": 1,
    "cohorteId": 1
  })
  const groupp2 = await Groupp.create({
    "name": "Groupp02",
    "grouppmId": 1,
    "cohorteId": 1
  })
  const groupp3 = await Groupp.create({
    "name": "Groupp01",
    "grouppmId": 2,
    "cohorteId": 1
  })
  const groupp4 = await Groupp.create({
    "name": "Groupp02",
    "grouppmId": 2,
    "cohorteId": 1
  })
  //cohorte2
  const groupp5 = await Groupp.create({
    "name": "Groupp01",
    "grouppmId": 3,
    "cohorteId": 2
  })
  const groupp6 = await Groupp.create({
    "name": "Groupp02",
    "grouppmId": 3,
    "cohorteId": 2
  })
  const groupp7 = await Groupp.create({
    "name": "Groupp01",
    "grouppmId": 4,
    "cohorteId": 2
  })
  const groupp8 = await Groupp.create({
    "name": "Groupp02",
    "grouppmId": 4,
    "cohorteId": 2
  })
  //////// CREAR ESTUDIANTES /////////////
  const student1 = await Student.create({
    "grouppId": 1,
    "userId": 9,
    "cohorteId": 1,
    "grouppmId": 1,
  })
  const student2 = await Student.create({
    "grouppId": 1,
    "userId": 10,
    "cohorteId": 1,
    "grouppmId": 1,
  })
  const student3 = await Student.create({
    "grouppId": 1,
    "userId": 11,
    "cohorteId": 1,
    "grouppmId": 1,
  })
  const student4 = await Student.create({
    "grouppId": 1,
    "userId": 12,
    "cohorteId": 1,
    "grouppmId": 1,
  })
  const student5 = await Student.create({
    "grouppId": 1,
    "userId": 13,
    "cohorteId": 1,
    "grouppmId": 1,
  })
  const student6 = await Student.create({
    "grouppId": 1,
    "userId": 14,
    "cohorteId": 1,
    "grouppmId": 1,
  })
  const student7 = await Student.create({
    "grouppId": 1,
    "userId": 15,
    "cohorteId": 1,
    "grouppmId": 1,
  })
  const student8 = await Student.create({
    "grouppId": 1,
    "userId": 16,
    "cohorteId": 1,
    "grouppmId": 1,
  })
  const student9 = await Student.create({
    "grouppId": 1,
    "userId": 17,
    "cohorteId": 1,
    "grouppmId": 1,
  })
  const student10 = await Student.create({
    "grouppId": 1,
    "userId": 18,
    "cohorteId": 1,
    "grouppmId": 1,
  })
  const student11 = await Student.create({
    "grouppId": 2,
    "userId": 19,
    "cohorteId": 1,
    "grouppmId": 1,
  })
  const student12 = await Student.create({
    "grouppId": 2,
    "userId": 20,
    "cohorteId": 1,
    "grouppmId": 1,
  })
  const student13 = await Student.create({
    "grouppId": 2,
    "userId": 21,
    "cohorteId": 1,
    "grouppmId": 1,
  })
  const student14 = await Student.create({
    "grouppId": 2,
    "userId": 22,
    "cohorteId": 1,
    "grouppmId": 1,
  })
  const student15 = await Student.create({
    "grouppId": 2,
    "userId": 23,
    "cohorteId": 1,
    "grouppmId": 1,
  })
  const student16 = await Student.create({
    "grouppId": 2,
    "userId": 24,
    "cohorteId": 1,
    "grouppmId": 1,
  })
  const student17 = await Student.create({
    "grouppId": 2,
    "userId": 25,
    "cohorteId": 1,
    "grouppmId": 1,
  })
  const student18 = await Student.create({
    "grouppId": 2,
    "userId": 26,
    "cohorteId": 1,
    "grouppmId": 1,
  })
  const student19 = await Student.create({
    "grouppId": 2,
    "userId": 27,
    "cohorteId": 1,
    "grouppmId": 1,
  })
  const student20 = await Student.create({
    "grouppId": 2,
    "userId": 28,
    "cohorteId": 1,
    "grouppmId": 1,
  })
  const student21 = await Student.create({
    "grouppId": 3,
    "userId": 29,
    "cohorteId": 1,
    "grouppmId": 2,
  })
  const student22 = await Student.create({
    "grouppId": 3,
    "userId": 30,
    "cohorteId": 1,
    "grouppmId": 2,
  })
  const student23 = await Student.create({
    "grouppId": 3,
    "userId": 31,
    "cohorteId": 1,
    "grouppmId": 2,
  })
  const student24 = await Student.create({
    "grouppId": 3,
    "userId": 32,
    "cohorteId": 1,
    "grouppmId": 2,
  })
  const student25 = await Student.create({
    "grouppId": 3,
    "userId": 33,
    "cohorteId": 1,
    "grouppmId": 2,
  })
  const student26 = await Student.create({
    "grouppId": 3,
    "userId": 34,
    "cohorteId": 1,
    "grouppmId": 2,
  })
  const student27 = await Student.create({
    "grouppId": 3,
    "userId": 35,
    "cohorteId": 1,
    "grouppmId": 2,
  })
  const student28 = await Student.create({
    "grouppId": 3,
    "userId": 36,
    "cohorteId": 1,
    "grouppmId": 2,
  })
  const student29 = await Student.create({
    "grouppId": 3,
    "userId": 37,
    "cohorteId": 1,
    "grouppmId": 2,
  })
  const student30 = await Student.create({
    "grouppId": 3,
    "userId": 38,
    "cohorteId": 1,
    "grouppmId": 2,
  })
  const student31 = await Student.create({
    "grouppId": 4,
    "userId": 39,
    "cohorteId": 1,
    "grouppmId": 2,
  })
  const student32 = await Student.create({
    "grouppId": 4,
    "userId": 40,
    "cohorteId": 1,
    "grouppmId": 2,
  })
  const student33 = await Student.create({
    "grouppId": 4,
    "userId": 41,
    "cohorteId": 1,
    "grouppmId": 2,
  })
  const student34 = await Student.create({
    "grouppId": 4,
    "userId": 42,
    "cohorteId": 1,
    "grouppmId": 2,
  })
  const student35 = await Student.create({
    "grouppId": 4,
    "userId": 43,
    "cohorteId": 1,
    "grouppmId": 2,
  })
  const student36 = await Student.create({
    "grouppId": 4,
    "userId": 44,
    "cohorteId": 1,
    "grouppmId": 2,
  })
  const student37 = await Student.create({
    "grouppId": 4,
    "userId": 45,
    "cohorteId": 1,
    "grouppmId": 2,
  })
  const student38 = await Student.create({
    "grouppId": 4,
    "userId": 46,
    "cohorteId": 1,
    "grouppmId": 2,
  })
  const student39 = await Student.create({
    "grouppId": 4,
    "userId": 47,
    "cohorteId": 1,
    "grouppmId": 2,
  })
  const student40 = await Student.create({
    "grouppId": 4,
    "userId": 48,
    "cohorteId": 1,
    "grouppmId": 3,
  })
  const student41 = await Student.create({
    "grouppId": 5,
    "userId": 49,
    "cohorteId": 2,
    "grouppmId": 3,
  })
  const student42 = await Student.create({
    "grouppId": 5,
    "userId": 50,
    "cohorteId": 2,
    "grouppmId": 3,
  })
  const student43 = await Student.create({
    "grouppId": 5,
    "userId": 51,
    "cohorteId": 2,
    "grouppmId": 3,
  })
  const student44 = await Student.create({
    "grouppId": 5,
    "userId": 52,
    "cohorteId": 2,
    "grouppmId": 3,
  })
  const student45 = await Student.create({
    "grouppId": 5,
    "userId": 53,
    "cohorteId": 2,
    "grouppmId": 3,
  })
  const student46 = await Student.create({
    "grouppId": 5,
    "userId": 54,
    "cohorteId": 2,
    "grouppmId": 3,
  })
  const student47 = await Student.create({
    "grouppId": 5,
    "userId": 55,
    "cohorteId": 2,
    "grouppmId": 3,
  })
  const student48 = await Student.create({
    "grouppId": 5,
    "userId": 56,
    "cohorteId": 2,
    "grouppmId": 3,
  })
  const student49 = await Student.create({
    "grouppId": 5,
    "userId": 57,
    "cohorteId": 2,
    "grouppmId": 3,
  })
  const student50 = await Student.create({
    "grouppId": 5,
    "userId": 58,
    "cohorteId": 2,
    "grouppmId": 3,
  })
  const student51 = await Student.create({
    "grouppId": 6,
    "userId": 59,
    "cohorteId": 2,
    "grouppmId": 3,
  })
  const student52 = await Student.create({
    "grouppId": 6,
    "userId": 60,
    "cohorteId": 2,
    "grouppmId": 3,
  })
  const student53 = await Student.create({
    "grouppId": 6,
    "userId": 61,
    "cohorteId": 2,
    "grouppmId": 3,
  })
  const student54 = await Student.create({
    "grouppId": 6,
    "userId": 62,
    "cohorteId": 2,
    "grouppmId": 3,
  })
  const student55 = await Student.create({
    "grouppId": 6,
    "userId": 63,
    "cohorteId": 2,
    "grouppmId": 3,
  })
  const student56 = await Student.create({
    "grouppId": 6,
    "userId": 64,
    "cohorteId": 2,
    "grouppmId": 3,
  })
  const student57 = await Student.create({
    "grouppId": 6,
    "userId": 65,
    "cohorteId": 2,
    "grouppmId": 3,
  })
  const student58 = await Student.create({
    "grouppId": 6,
    "userId": 66,
    "cohorteId": 2,
    "grouppmId": 3,
  })
  const student59 = await Student.create({
    "grouppId": 6,
    "userId": 67,
    "cohorteId": 2,
    "grouppmId": 3,
  })
  const student60 = await Student.create({
    "grouppId": 6,
    "userId": 68,
    "cohorteId": 2,
    "grouppmId": 4,
  })
  const student61 = await Student.create({
    "grouppId": 7,
    "userId": 69,
    "cohorteId": 2,
    "grouppmId": 4,
  })
  const student62 = await Student.create({
    "grouppId": 7,
    "userId": 70,
    "cohorteId": 2,
    "grouppmId": 4,
  })
  const student63 = await Student.create({
    "grouppId": 7,
    "userId": 71,
    "cohorteId": 2,
    "grouppmId": 4,
  })
  const student64 = await Student.create({
    "grouppId": 7,
    "userId": 72,
    "cohorteId": 2,
    "grouppmId": 4,
  })
  const student65 = await Student.create({
    "grouppId": 7,
    "userId": 73,
    "cohorteId": 2,
    "grouppmId": 4,
  })
  const student66 = await Student.create({
    "grouppId": 7,
    "userId": 73,
    "cohorteId": 2,
    "grouppmId": 4,
  })
  const student67 = await Student.create({
    "grouppId": 7,
    "userId": 74,
    "cohorteId": 2,
    "grouppmId": 4,
  })
  const student68 = await Student.create({
    "grouppId": 7,
    "userId": 75,
    "cohorteId": 2,
    "grouppmId": 4,
  })
  const student69 = await Student.create({
    "grouppId": 7,
    "userId": 76,
    "cohorteId": 2,
    "grouppmId": 4,
  })
  const student70 = await Student.create({
    "grouppId": 7,
    "userId": 77,
    "cohorteId": 2,
    "grouppmId": 4,
  })
  const student71 = await Student.create({
    "grouppId": 8,
    "userId": 78,
    "cohorteId": 2,
    "grouppmId": 4,
  })
  const student72 = await Student.create({
    "grouppId": 8,
    "userId": 79,
    "cohorteId": 2,
    "grouppmId": 4,
  })
  const student73 = await Student.create({
    "grouppId": 8,
    "userId": 80,
    "cohorteId": 2,
    "grouppmId": 4,
  })
  const student74 = await Student.create({
    "grouppId": 8,
    "userId": 81,
    "cohorteId": 2,
    "grouppmId": 4,
  })
  const student75 = await Student.create({
    "grouppId": 8,
    "userId": 82,
    "cohorteId": 2,
    "grouppmId": 4,
  })
  const student76 = await Student.create({
    "grouppId": 8,
    "userId": 83,
    "cohorteId": 2,
    "grouppmId": 4,
  })
  const student77 = await Student.create({
    "grouppId": 8,
    "userId": 84,
    "cohorteId": 2,
    "grouppmId": 4,
  })
  const student78 = await Student.create({
    "grouppId": 8,
    "userId": 85,
    "cohorteId": 2,
    "grouppmId": 4,
  })
  const student79 = await Student.create({
    "grouppId": 8,
    "userId": 86,
    "cohorteId": 2,
    "grouppmId": 4,
  })
  const student80 = await Student.create({
    "grouppId": 8,
    "userId": 87,
    "cohorteId": 2,
    "grouppmId": 4,
  })
  await Checkpoint.create({
    "userId": 12,
    "name": "check1",
    "qualification": "20/20",
    "info": "excelente"
  })
  await Checkpoint.create({
    "userId": 12,
    "name": "check2",
    "qualification": "19/19",
    "info": "excelente"
  })
  await Checkpoint.create({
    "userId": 12,
    "name": "check3",
    "qualification": "18/18",
    "info": "excelente"
  })
  await Checkpoint.create({
    "userId": 12,
    "name": "check4",
    "qualification": "17/17",
    "info": "excelente"
  })
  const modulo2P1 = await Modulo.create({
    "name": '2 - Frontend',
    "nameClass": "DOM",
    "description": "introduccion al DOM",
    "linkVideos": "https://vimeo.com/soyhenry/review/460236181/4004e82a9f?sort=lastUserActionEventDate&direction=desc",
    "cohorteId": 1
  })
  const modulo1P1 = await Modulo.create({
    "name": '1 - JS Foundations',
    "nameClass": "JS avanzado I",
    "description": "introduccion a JS",
    "linkVideos": "https://vimeo.com/soyhenry/review/455889842/b7ceea0328?sort=lastUserActionEventDate&direction=desc",
    "cohorteId": 1
  })
  const modulo1P2 = await Modulo.create({
    "name": '1 - JS Foundations',
    "nameClass": "JS avanzado II",
    "description": "Continuacion con JS",
    "linkVideos": "https://vimeo.com/soyhenry/review/456237088/0d30f4262b?sort=lastUserActionEventDate&direction=desc",
    "cohorteId": 1
  })
  const modulo1P3 = await Modulo.create({
    "name": '1 - JS Foundations',
    "nameClass": "DSI",
    "description": "Continuacion",
    "linkVideos": "https://vimeo.com/soyhenry/review/457023386/510dca40b9?sort=lastUserActionEventDate&direction=desc",
    "cohorteId": 1
  })
  const modulo1P4 = await Modulo.create({
    "name": '1 - JS Foundations',
    "nameClass": "DSII",
    "description": "Continuacion",
    "linkVideos": "https://vimeo.com/soyhenry/review/457833873/855264abf8?sort=lastUserActionEventDate&direction=desc",
    "cohorteId": 1
  })
  const modulo1P5 = await Modulo.create({
    "name": '1 - JS Foundations',
    "nameClass": "Algoritmos",
    "description": "Continuacion",
    "linkVideos": "https://vimeo.com/soyhenry/review/458619858/bd6cf5a429?sort=lastUserActionEventDate&direction=desc",
    "cohorteId": 1
  })
  // await Calendar.create({
  //   "title": "Evento dia",
  //   "start": "2020-10-01",
  //   "end": "2020-10-01",
  //   "allDay": true,
  //   "cohorteId": 1,
  // })
  // await Calendar.create({
  //   "title": "Evento largo",
  //   "start": "2020-10-07",
  //   "end": "2020-10-10",
  //   "allDay": true,
  //   "cohorteId": 1,
  // })
  // await Calendar.create({
  //   "title": "Evento horario recurrente",
  //   "startRecur": "2020-10-09",
  //   "endRecur": "2020-10-09",
  //   "startTime": "09:00",
  //   "endTime": "12:30",
  //   "allDay": false,
  //   "cohorteId": 1,
  // })
  // await Calendar.create({
  //   "title": "Evento horario recurrente",
  //   "startRecur": "2020-10-16",
  //   "endRecur": "2020-10-16",
  //   "startTime": "09:00",
  //   "endTime": "12:30",
  //   "allDay": false,
  //   "cohorteId": 1,
  // })
  res.status(200).send('seed finalizado exitosamente!!')
})

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
