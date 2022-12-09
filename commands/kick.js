module.exports = {
    name: 'kick',
    description: 'this is kick command',
    execute(client, message, args){
        
        //* ALTERNATIVE WITH NAME
        let role = message.guild.roles.cache.find(r => r.name === "tester");
        
        if(message.member.permissions.has("KICK_MEMBERS")){
            message.channel.send('You have the permissions to kick members');
        }

        if(message.member.permissions.has("BAN_MEMBERS")){
            message.channel.send('You have permissions to ban members');
        }else{
            message.channel.send("You don't have permissions to ban members");
        }
    }
}