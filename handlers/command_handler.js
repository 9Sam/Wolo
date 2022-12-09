const fs = require('fs'); //? Módulo para trabajar con archivos

//Este módulo es llamado desde el archivo main.js una sola vez al inicio de la carga
module.exports = (client, Discord) => {
    const command_files = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));
    // Se extraen los archivos contenidos dentro de la carpeta commands filtrandolos por su tipo, en este caso ``js``

    for(const file of command_files){
        //Se recorren todos los comandos dentro de ``command_files``
        const command = require(`../commands/${file}`);
        // Se requiren cada uno de los comandos uno a la vez
        if(command.name){
            // Donde command.name es igual a la propiedad nombre contenida dentro del archivo de cada comando
            client.commands.set(command.name, command);
            //Se le asigna el nombre del comando y el comando en sí mismo que está siendo exportando en cada uno de sus respectivos archivos.
            //EL ``client.commands`` hace referencia a la colección de datos creada en el archivo 🌲main.js
        }
    }
}