const mysqlConnection = require("../database/db.js");
//  htmlToPng.js
const { MessageAttachment, MessageEmbed } = require("discord.js");

const nodeHtmlToImage = require("node-html-to-image");

module.exports = {
    name: "prueba",
    description: "this is proof command",
    async execute(client, message, args) {
        const _htmlTemplate = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="styles.css">
            <title>Documento de prueba</title>
            <style>
            #card {
                font-family: "Poppins", Arial, Helvetica, sans-serif;
                background: rgb(22, 22, 22);
                color: #fff;
                max-width: 800px;
                border-top: #3cffde  solid 5px;
            }
            
            .container{
                display: flex;
                align-items: top;
                justify-content: center;
            }
            
            .item{
                /* border: #fff solid 1px; */
                padding: 10px;
                margin: 20px;
                width: 400px;
            }
            
            .app {
                max-width: 800px;
                padding: 20px;
                display: flex;
                flex-direction: row;
                border-top: 3px solid rgb(16, 180, 209);
                background: rgb(31, 31, 31);
                align-items: center;
            }
            
            img {
                width: 100px;
                height: 100px;
                margin-right: 20px;
                border-radius: 10%;
                border: 1px solid #fff;
                padding: 5px;
            }
            
            h1{
                text-align: center;
                padding: 10px;
            }
            </style>
        </head>
        <body>
            <div id="card">
                <h1>Comparación de unidades</h1>
                <div class="container">
                    <div class="item">
                        <img class="unit-image" src="https://static.wikia.nocookie.net/ageofempires/images/d/dd/Archer_aoe2DE.png/revision/latest?cb=20200401184234" alt="">
                        <h2>Arquero / Archer</h2>
                        <p>Bueno contra:
                            Unidades a distancia
                            <hr>
                            Malo contra:
                            Hostigadores y unidades a corto alcance
                            <hr>
                            Costo:
                            🥩 (0) | 🪓 (25) | 🟡 (45) | ⚪ (0)
                            <hr>
                            Beneficios:
                            💗 (30) | ⚔ (4 pierce) | 🦾 (0) | 🛡 (0) 🎯 (4)
                        </p>
                    </div>
                    <div class="item">
                        <img class="unit-image" src="https://static.wikia.nocookie.net/ageofempires/images/d/d1/Crossbowman_aoe2DE.png/revision/latest?cb=20200331010220" alt="">
                        <h2>Ballestero / Crossbowman</h2>
                        <p>
                            Bueno contra:
                            Unidades a distancia
                            <hr>
                            Malo contra:
                            Hostigadores de élite
                            Manganas
                            Unidades a corto alcance
                            <hr>
                            Costo:
                            🥩 (0) | 🪓 (25) | 🟡 (45) | ⚪ (0)
                            <hr>
                            Beneficios:
                            💗 (40) | ⚔ (5 pierce) | 🦾 (0) | 🛡 (0) 🎯 (5)
                        </p>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;

        const images = await nodeHtmlToImage({
            html: _htmlTemplate,
            quality: 100,
            type: "png",
            puppeteerArgs: {
                args: ["--no-sandbox"],
            },
            encoding: "buffer",
        });
        // for more configuration options refer to the library

        const embed = new MessageEmbed()
            .setColor("#ff5050")
            .setTitle(`Hola mundo`);

        message.channel.send({ embeds: [embed], files: [images] });
    },
};
