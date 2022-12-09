const {Message, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'this is the embed command for help',
    aliases: 'h',
    /** 
     * @param {Message} message 
     * @param {String[]} args 
     */
    async execute(client, message, args){
        const help = new MessageEmbed()
        .setColor("#ff5050")
        .setTitle(`Mensaje de ayuda`)
        .setThumbnail(`https://cdn.pixabay.com/photo/2016/10/08/18/35/help-1724292_1280.png`,"","200px","200px")
        .setDescription("Listado de comandos y ayuda del bot:")
        .addFields(
            {name: `Comandos`, value: `
                ------------------------------------------------------------
                ➡ 🔸***show/s + <nombre>:*** 🔸 
                    mostrar la descripción de una unidad o civilización.
                ➡ 🔸***comp/c + <nombre1> <nombre2>:*** 🔸 
                    mostrar la comparación entre dos unidades.
                ➡ 🔸***help/h:*** 🔸 
                    mostrar el recuadro de ayuda.

                ------------------------------------------------------------
            `, inline: true},
        )
        .setFooter('WOLO BOT');

        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setLabel("Más ayuda")
                .setEmoji("🔍")
                .setURL("https://youtube.com")
                .setStyle("LINK") //Cuando es una url no se puede usar otro estilo, solo aquí se puede usar el ``.setStyle`` y no tiene un **id** porque no es necesario.
        );

        message.channel.send({ embeds: [help], components: [row] });
    }

}