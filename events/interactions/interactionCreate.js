module.exports = (Discord, client, message) => {
    client.on("interactionCreate", async (interaction) => {
        // Slash Command Handling
        if (interaction.isCommand()) {
            await interaction.deferReply({ ephemeral: false }).catch(() => {});
    
            const cmd = client.slashCommands.get(interaction.commandName);
            if (!cmd)
                return interaction.followUp({ content: "An error has occured " });
    
            const args = [];
            interaction.option.array().map((x) => {
                args.push(x.value);
            })
    
            cmd.run(client, interaction, args);
        }
    
        // Context Menu Handling
        if (interaction.isContextMenu()) {
            await interaction.deferReply({ ephemeral: false });
            const command = client.slashCommands.get(interaction.commandName);
            if (command) command.run(client, interaction);
        }
    
        if(interaction.isButton()){
            console.log("Hello")
            if(interaction.customId === "button1"){
                interaction.reply({ content: "You clicked button1"})
            }
        }
    });
}


