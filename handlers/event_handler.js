// 📜 Ejecuta los archivos de todos los eventos que puedan existir
const fs = require('fs');

module.exports = (client, Discord) => {
    // Se le envia desde el archivo mainJs el client y el DiscordJs
    const load_dir = (dirs) => { //dirs es el nombre del archivo
        const event_files = fs.readdirSync(`./events/${dirs}`).filter(file => file.endsWith('.js'));
        // Lee todos los archivos que se encuentren dentro de la carpeta "events" y que terminen en ".js" o sean archivos js en otras palabras.

        for(const file of event_files) {
            const event = require(`../events/${dirs}/${file}`);
            //Se requiere cada uno de los archivos
            const event_name = file.split('.')[0]; // Se hace un split y se accede a la posición 0 al mismo tiempo
            // Se separan los nombres de los eventos para quitar la extensión ``.js``
            client.on(event_name, event.bind(null, Discord, client))
            // Se crea el eventListener para cada uno de los eventos
            
        }
    }

    ['client', 'guild', 'interactions'].forEach(e => load_dir(e));
    // Cargar cada uno de los directorios listados en el array
}