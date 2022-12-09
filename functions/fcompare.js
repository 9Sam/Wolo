const {MessageAttachment} = require('discord.js');
const Canvas  = require('canvas');

async function compareImages(images, unit, message){
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
        images.image1
    )
    ctx.drawImage(image1, 45, 25, 200, 200);

    const image2 = await Canvas.loadImage(
        images.image2
    )
    ctx.drawImage(image2, 450, 25, 200, 200);

    const attachment = new MessageAttachment(canvas.toBuffer());
    message.channel.send({ embeds: [unit], files: [attachment] });
}

module.exports = compareImages;
