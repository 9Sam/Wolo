// const mysqlConnection = require("../database/db.js");
const { MessageEmbed } = require('discord.js');
const getter = require("../functions/getters.js");

module.exports = {
    name: 'calculate',
    aliases: ['calcular', 'calc'],
    description: 'Calculates the number of resources needed for and amount of troops',
    execute(client, message, cmd, args){
        if(args[1] && args[0]){
            //💬 Se usa el objeto getter con la función getUnit de forma que se pueda recibir la promesa que se está esperando del archivo getters.js.
            getter.getUnit(args[0])
            .then(unit => {
                let resources = {
                    wood: parseInt(unit.wood) * parseInt(args[1]),
                    food: parseInt(unit.food) * parseInt(args[1]),
                    gold: parseInt(unit.gold) * parseInt(args[1]),
                    stone: parseInt(unit.stone * parseInt(args[1]))
                }
    
                message.channel.send("Se necesitan 🥩 " + "``" + resources.food + "``" + " 🪓 " + "``" + resources.wood + "``" + " 🟡 " + "``" + resources.gold + "``" + " ⚪ " + "``" + resources.stone + "``\npara " + " ➡️ ``" + args[1]+ "`` ➡️ **" + unit.unit_name + "**");
            }).catch(err => console.log(err));
        }else{
            message.channel.send("⚠️ Insuficientes parámetros `calc + <unidad> + <cantidad>`")
        }
    }
}