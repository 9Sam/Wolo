const { Client, Message, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: "buttons",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    async execute(client, message, args){
        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId("button1")
                .setLabel("Button")
                .setEmoji("🧪")
                .setStyle("PRIMARY"),
            new MessageButton()
                .setCustomId("button2")
                .setLabel("Button 2")
                .setEmoji("🧪")
                .setStyle("PRIMARY"),
            new MessageButton()
                .setCustomId("button3")
                .setLabel("Button 3")
                .setEmoji("🧪")
                .setStyle("PRIMARY"),
            new MessageButton()
                .setLabel("Button 3")
                .setEmoji("🧪")
                .setURL("https://youtube.com")
                .setStyle("LINK"),
        );

        message.channel.send({content: "Hola mundo", components: [row]});
    }
}