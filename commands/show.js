const { MessageEmbed } = require('discord.js');
const mysqlConnection = require("../database/db.js");
const icons = require("../functions/icons.js");
let queri;
let func;

module.exports = {
    name: 'show',
    aliases: ['s'],
    description: 'this is the embed command',
    execute(client, message, cmd, args){
        mysqlConnection.query(
            `SELECT count(id_civi) as idCivi FROM civilization where civi_name like "%${args[0]}%";
            SELECT count(id_unit) as idUnit FROM unit where unit_name like "%${args[0]}%";`,
            (err, rows, fields) => {
                if (!err) {
                    if(rows[0][0].idCivi > rows[1][0].idUnit){
                        queri = `SELECT c.id_civi, c.civi_name, c.characteristics, c.team_bonus, c.image, c.url, c.score, cts.id_civi_types, cts.id_civi_type, cts.id_civi, ct.id_civi_type, ct.civi_type,
                        GROUP_CONCAT(cts.id_civi_type) as ids,
                        GROUP_CONCAT(ct.civi_type) as tipos
                        FROM civilization as c
                        join civi_types as cts on cts.id_civi =  c.id_civi
                        join civi_type as ct on ct.id_civi_type = cts.id_civi_type
                        where c.civi_name like "%${args[0]}%"
                        group by c.id_civi;`
                        func = 1;
                    }else{
                        queri = `SELECT * FROM unit as u
                        join unit_type as ut on ut.id_unit_type = u.id_unit_type
                        join statistics as s on s.id_stats = u.id_stats
                        where unit_name like "%${args[0]}%";`
                        func = 2;
                    }
                    
                    mysqlConnection.query(
                        queri,
                        (err, rows, fields) => {
                            if (!err) {
                                if(rows[0] != undefined){
                                    (func == 1)
                                    ? civi(rows[0])
                                    : unit(rows[0]);
                                }
                            } else {
                                console.log(err);
                            }
                        });

                } else {
                    console.log(err);
                }
            });

        function unit(data){
            let tipo = icons.getUnitTypes(data.unit_type, data.id_unit_type);

            const unit = new MessageEmbed()
            .setColor("#84ff66")
            .setTitle(`${data.unit_name}`)
            .setURL("https://ageofempires.fandom.com/es/wiki/Arquero_(Age_of_Empires_II)")
            .setDescription("Descripción de unidad")
            .addFields(
                {name: `Tipo:`, value: `${tipo}`, inline: true},
                {name: `| Bueno contra:`, value: `| ${data.good_against}`, inline: true},
                {name: `| Malo contra:`, value: `| ${data.bad_against}`,inline: true},
                {name: `Costo:`, value: "🥩 ``"+data.food +"`` | 🪓 ``" + data.wood + "`` | 🟡 ``" + data.gold + "`` | ⚪  ``"+ data.stone + "``", inline: false},
                {name: `Beneficios:`, value: "💗 ``" + data.health + "`` ⚔ ``" + data.attack + "`` 🦾 ``" + data.melee_armor + "`` 🛡 ``" + data.pierce_armor + "`` 📏 ``" + data.srange + "`` 🎯 ``" + data.accuracy * 100 + " %`` 👟 ``" + data.speed + "`` 👁 ``" + data.line_sight + "``",inline: false}
            )
            .setImage(`${data.image}`,"","200px","200px")
            .setFooter('WOLO BOT');

            message.channel.send({ embeds: [unit] });
        }
        function civi(data){
            let tipo;

            tipo = icons.getCiviTypes(data.tipos, data.ids);

            const civi = new MessageEmbed()
            .setColor("#14ff66")
            .setTitle(`${data.civi_name}`)
            .setURL(`${data.url}`)
            .setThumbnail(`${data.image}`,"","200px","200px")
            .setDescription("Descripción de unidad")
            .addFields(
                {name: `Tipo:`, value: `${tipo}`, inline: true},
                {name: `Bonus de civilización:`, value: ` ${data.characteristics}`, inline: false},
                {name: `Bonus de equipo:`, value: `${data.team_bonus}`,inline: true},
            )
            .setFooter('WOLO BOT');

            message.channel.send({ embeds: [civi] });
        }
    }

}