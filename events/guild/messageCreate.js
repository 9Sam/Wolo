module.exports = (Discord, client, message) => {
    const prefix = "."; // Prefijo que usan los comandos 
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    //Si no existe el prefijo o no fue el autor del bot no retorna nada

    const args = message.content.slice(prefix.length).split(/ +/);
    //Se parte el contenido del mensaje tomando en consideración la longitud del prefijo, luego se separa por los espacios en blanco donde hayan uno o más de uno.
    const cmd = args.shift().toLowerCase();
    //Elimina el primer elemento debido a que este es el nombre o el comando en si mismo.

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));
    //❗La línea de código anterior compara si se encuentra el ``cmd`` o se encuentran aliases dentro del archivo en especifico el mencionado en el mensaje.
    // ⚠️ la cláusula ``.get(cmd)`` probablemente sea parte de las collection con la cual fueron creados estos parámetros, sin embargo aún se puede usar el find para buscar dentro de un array de las propiedades.

    if(command) command.execute(client, message, cmd, args, Discord);
    //Al final si existe el comando entonces se ejecuta
}