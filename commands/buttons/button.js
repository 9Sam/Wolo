const { Client, Message, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: "button",
    /**
     * @param {Client}
     * @param {Message}
     * @param {String[]}
     */
    async execute(message, args){
        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId("button1")
                .setLabel("Button")
                .setEmoji("🧫")
                .setStyle()
        );

        message.channel.send({content: "Hola mundo", components: [row]});
    }
}