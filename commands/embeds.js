const {MessageEmbed } = require('discord.js');
module.exports = {
    name: 'embeds',
    description: 'this is the embed command',
    execute(client, message, args){
        const newEmbed = new MessageEmbed()
            .setColor("#84ff66")
            .setTitle("Rules")
            .setURL("http://youtube.com/")
            .setDescription("This is an embed for server rules")
            .addFields(
                {name: 'Rule 1', value: 'Be nice'},
                {name: 'Rule 2', value: 'Composture'},
                {name: 'Rule 3', value: 'No memes'}
            )
            .setImage('https://play-lh.googleusercontent.com/mOkjjo5Rzcpk7BsHrsLWnqVadUK1FlLd2-UlQvYkLL4E9A0LpyODNIQinXPfUMjUrbE=s272-rw',"","200px","200px")
            .setFooter('Make shure to check out the rules');

        message.channel.send({ embeds: [newEmbed] });
    }
}