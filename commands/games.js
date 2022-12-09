const { Client, Message, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: "games",
    aliases: ["g", "gam"],
    description: "Command for the games of the bot",
    execute(client, message, cmd, args){
        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId("button1")
                .setLabel("Adivina la tropa")
                .setEmoji("⁉️")
                .setStyle("PRIMARY"),
            new MessageButton()
                .setCustomId("button2")
                .setLabel("Describe la tropa")
                .setEmoji("📝")
                .setStyle("PRIMARY"),
            new MessageButton()
                .setCustomId("button3")
                .setLabel("Describe la unidad")
                .setEmoji("📝")
                .setStyle("PRIMARY"),
            new MessageButton()
                .setLabel("Button 3")
                .setEmoji("🧪")
                .setURL("https://youtube.com")
                .setStyle("LINK"),
        );

        message.channel.send({content: "Juegos disponibles", components: [row]});
    }
}