require('dotenv').config(); // Permite cargar las variables de entorno
const mysql = require("mysql"); // Se requiere la base de datos
const express = require("express"); // Se require la libreria express para poder crear el servidor local
const app = express(); // Se crea un aplicación y se levanta localmente
const bodyparser = require("body-parser"); // La aplicación lo necesita para funcionar

// Used for sending the Json Data to Node API
app.use(express.json());
app.use(bodyparser.json());

// Connection String to Database
var mysqlConnection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    multipleStatements: true,
});

// To check whether the connection is succeed for Failed while running the project in console.
mysqlConnection.connect((err) => {
    if (!err) {
        console.log("Db Connection Succeed");
    } else {
        console.log(
            "Db connect Failed \n Error :" + JSON.stringify(err, undefined, 2)
        );
    }
});

setInterval(() => {
    mysqlConnection.query("select 1")
}, 5000);

// To Run the server with Port Number
app.listen(3000, () =>
    console.log("Express server is running at port no : 3000")
);

module.exports = mysqlConnection;

