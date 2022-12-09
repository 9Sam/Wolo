const { MessageAttachment, GuildMember, User } = require('discord.js');
const Canvas  = require('canvas');

module.exports = {
    /**
     * @param {MessageAttachment} attachment
     * @param {GuildMember} guild
     * @param {User} user
     * @param {Canvas} Canvas
     */
    name: 'canvas',
    aliases: ['cp'],
    description: 'this is ping command',
    async execute(client, message, cmd, args){
        if(cmd === 'canvas'){
            // CREAR UN CANVAS
            const canvas = Canvas.createCanvas(1018, 468);
            // CREAR EL CONTEXTO DEL CANVAS
            const ctx = canvas.getContext('2d');
            const background = await Canvas.loadImage(
                'public/img/Welcome.jpg'
            )
            let x = 0;
            let y = 0;
            ctx.drawImage(background, x, y, canvas.width, canvas.height);
            
            // TEXTO DE LA IMAGEN
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '80px Impact';
            let text = `Welcome Samuel`;
            x = canvas.width / 2 - ctx.measureText(text).width / 2;
            ctx.fillText(text, 460, 260, 400)
            
            ctx.beginPath();
            ctx.arc(247, 238, 175, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
    
            const pfp = await Canvas.loadImage(
                message.author.displayAvatarURL({ format: 'png', size: 1024, dynamic: true }),
            )
            // x = canvas.width / 2 - pfp.width / 2;
            // y = canvas.height / 2 - pfp.height / 2;
            ctx.drawImage(pfp, 72, 63, 350, 350);
    
    
    
            const attachment = new MessageAttachment(canvas.toBuffer());
            message.channel.send({content:  `${message.author.username}'s base:\n⁣`, files: [attachment]})
        }else
        if(cmd === "cp"){
            // CREAR UN CANVAS
            const canvas = Canvas.createCanvas(700, 250);
            // CREAR EL CONTEXTO DEL CANVAS
            const ctx = canvas.getContext('2d');
            const background = await Canvas.loadImage(
                'dist/img/Dark-blue.png'
            )
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            
            //TEXTO DE LA IMAGEN
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '50px Impact';
            let text = `VS`;
            // let x = canvas.width / 2 - ctx.measureText(text).width / 2;
            ctx.fillText(text, canvas.width / 2 - ctx.measureText(text).width / 2, 140, 400)
            
            ctx.beginPath();
            ctx.arc(145, 125, 100, 0, Math.PI * 2, true);
            ctx.arc(550, 125, 100, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
    
            const image1 = await Canvas.loadImage(
                'https://static.wikia.nocookie.net/ageofempires/images/5/5f/Artillero_manual_aoe2DE.png/revision/latest/scale-to-width-down/256?cb=20200616074658&path-prefix=es'
            )
            // x = canvas.width / 2 - pfp.width / 2;
            // y = canvas.height / 2 - pfp.height / 2;
            ctx.drawImage(image1, 45, 25, 200, 200);

            const image2 = await Canvas.loadImage(
                'https://static.wikia.nocookie.net/ageofempires/images/1/1f/Caballero_icono-DE.png/revision/latest?cb=20200407080846&path-prefix=es'
            )
            ctx.drawImage(image2, 450, 25, 200, 200);
    
    
    
            const attachment = new MessageAttachment(canvas.toBuffer());
            message.channel.send({content:  `${message.author.username}'s base:\n⁣`, files: [attachment]})
        }
    }//Execute end
}//Module end