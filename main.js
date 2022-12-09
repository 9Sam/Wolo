//Archivo principal que almacena las herramientas necesarias para inicializar la aplicación

const { Client, Intents, Message} = require("discord.js");
const Discord = require("discord.js");
// Requiere el objeto Discord de la libreria discord js
require('dotenv').config();
// Sirve para trabajar con variables de entorno
require("./database/db.js")
// Se requiere la base de datos

// Create a new client instance
const client = new Client({ intents: [
    // EL objeto ``client`` es el que permite al programador interactuar con la api de discord
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
]});
// Los intentes son los eventos que discordjs está esperando que ocurran, si no se proveen los intents necesarios es provable que la aplicación no funcione correctamente.

//? Collection de todos los archivos dentro de la carpeta "commands"
client.commands = new Discord.Collection(); // Colección de los comandos vacía
client.events = new Discord.Collection(); // Coleción de eventos vacía

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})
// Se recorren los dos archivos autoejecutando el código exportado en cada uno de ellos
client.login(process.env.DISCORDJS_BOT_TOKEN);

module.exports = client;
