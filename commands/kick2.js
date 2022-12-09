module.exports = {
    name: 'kick2',
    description: 'this is a kick command',
    execute(client, message, args){
        
        //* ALTERNATIVE WITH NAME
        const member = message.mentions.users.first();
        
        if(member){
            const memberTarget = message.guild.members.cache.get(member.id);
            memberTarget.kick();
            message.channel.send('The user has been kicked');
        }else{
            message.channel.send("You can't kick that member")
        }
    }
}