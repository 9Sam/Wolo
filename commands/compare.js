const { MessageEmbed, MessageAttachment } = require('discord.js');
const mysqlConnection = require("../database/db.js");
const compareImages = require('../functions/fcompare.js');
const icons = require("../functions/icons.js");
require("../functions/fcompare.js");

module.exports = {
    name: 'compare',
    aliases: ['c','comp'],
    description: 'compare command for units and civilizations',
    /**
     * 
     * @param {*} client 
     * @param {*} message 
     * @param {*} cmd 
     * @param {*} args 
     * @param {CompareImages} compareImages
     */
    execute(client, message, cmd, args){
        mysqlConnection.query(
            `
            select count(id_civi) as idCivi from civilization where civi_name like "%${args[0]}%" or civi_name like "%${args[1]}%";
            select count(id_unit) as idUnit from unit where unit_name like "%${args[0]}%" or unit_name like "%${args[1]}%";
            `,
            (err, rows, fields) => {
                if (!err) {
                    if(rows[0][0].idCivi > rows[1][0].idUnit){
                        queri = `
                        SELECT c.civi_name, c.characteristics, c.team_bonus, c.image, c.url, c.score,  group_concat(ct.civi_type) as civi_type, group_concat(ct.id_civi_type) as id_civi_type
                        FROM civilization as c
                        join civi_types as cts on cts.id_civi =  c.id_civi
                        join civi_type as ct on ct.id_civi_type = cts.id_civi_type
                        where c.civi_name like "%${args[0]}%" or c.civi_name like "%${args[1]}%"
                        group by c.civi_name
                        order by case
                            when c.civi_name like "%${args[0]}%" then 1
                            when c.civi_name like "%${args[1]}%" then 2
                            else 3
                        end;`
                        func = 1;
                    }else{
                        queri = `
                        SELECT * FROM unit as u
                        join unit_type as ut on ut.id_unit_type = u.id_unit_type
                        join statistics as s on s.id_stats = u.id_stats
                        where unit_name like "%${args[0]}%" or unit_name like "%${args[1]}%"
                        order by case 
                            when unit_name LIKE "%${args[0]}%" then 1 
                            when unit_name LIKE "%${args[1]}%" then 2 
                            else 3 
                        end`
                        func = 2;
                    }
                    
                    mysqlConnection.query(
                        queri,
                        (err, row, fields) => {
                            if (!err) {
                                console.log(row[0]);
                                console.log(row[1]);
                                if(row[0] && row[1]){
                                    (func == 1)
                                    ? civi(row[0], row[1])
                                    : unit(row[0], row[1]);
                                }
                            } else {
                                console.log(err);
                            }
                        });

                } else {
                    console.log(err);
                }
            });
    
        function unit(data1, data2){
            const unit = new MessageEmbed()
            .setColor("#84ff66")
            .setTitle(`(${data1.unit_name}) VS (${data2.unit_name})`)
            .setURL("https://ageofempires.fandom.com/es/wiki/Arquero_(Age_of_Empires_II)")
            .setDescription("Descripción de unidad")
            .addFields(
                {name: `Tipo:`, value: `🏹 ${data1.unit_type}`, inline: true},
                {name: `\u200b`, value: `\u200b`, inline: true},
                {name: `Tipo:`, value: `🏹 ${data2.unit_type}`, inline: true},
                {name: `Bueno contra:`, value: `${data1.good_against}`, inline: true},
                {name: `\u200b`, value: `\u200b`, inline: true},
                {name: `Bueno contra:`, value: `${data2.good_against}`, inline: true},
                {name: `Malo contra:`, value: `${data1.bad_against}`,inline: true},
                {name: `\u200b`, value: `\u200b`, inline: true},
                {name: `Malo contra:`, value: `${data2.bad_against}`,inline: true},
                {name: `Costo:`, value: "🥩 ``"+data1.food +"`` | 🪓 ``" + data1.wood + "`` | 🟡 ``" + data1.gold + "`` | ⚪  ``"+ data1.stone + "``", inline: false},
                {name: `Costo:`, value: "🥩 ``"+data2.food +"`` | 🪓 ``" + data2.wood + "`` | 🟡 ``" + data2.gold + "`` | ⚪  ``"+ data2.stone + "``", inline: false},
                {name: `Beneficios:`, value: "💗 ``" + data1.health + "`` ⚔ ``" + data1.attack + "`` 🦾 ``" + data1.melee_armor + "`` 🛡 ``" + data1.pierce_armor + "`` 📏 ``" + data1.srange + "`` 🎯 ``" + data1.accuracy * 100 + " %`` 👟 ``" + data1.speed + "`` 👁 ``" + data1.line_sight + "``",inline: false},
                {name: `Beneficios:`, value: "💗 ``" + data2.health + "`` ⚔ ``" + data2.attack + "`` 🦾 ``" + data2.melee_armor + "`` 🛡 ``" + data2.pierce_armor + "`` 📏 ``" + data2.srange + "`` 🎯 ``" + data2.accuracy * 100 + " %`` 👟 ``" + data2.speed + "`` 👁 ``" + data2.line_sight + "``",inline: false},
                
            )
            .setFooter('WOLO BOT');

            const unitImages = {
                image1: data1.image,
                image2: data2.image
            }

            compareImages(unitImages, unit, message)
        }

        function civi(data1, data2){
            let tipos1 = icons.getCiviTypes(data1.civi_type, data1.id_civi_type);
            let tipos2 = icons.getCiviTypes(data2.civi_type, data2.id_civi_type);

            const civi = new MessageEmbed()
            .setColor("#14ff66")
            .setTitle(`(🔵 ${data1.civi_name}) VS (🔴 ${data2.civi_name})`)
            .setURL(`${data1.url}`)
            .setThumbnail(`${data1.image}`,"","200px","200px")
            .setDescription("Comparación de unidades")
            .addFields(
                { name: '\u200b', value: '---------------------------------------------', inline: false},
                {name: `Tipo:`, value: `${tipos1}`, inline: true},
                {name: `Tipo:`, value: `${tipos2}`, inline: true},
                {name: `🔵 Bonus de civilización:`, value: `${data1.characteristics}`, inline: false},
                {name: `🔴 Bonus de civilización:`, value: `${data2.characteristics}`, inline: false},
                {name: `🔵 Bonus de equipo:`, value: `${data1.team_bonus}`,inline: true},
                {name: `🔴 Bonus de equipo:`, value: `${data2.team_bonus}`,inline: true},
                { name: '---------------------------------------------', value: '\u200b', inline: false},
            )
            .setFooter('WOLO BOT');

            const civiImages = {
                image1: data1.image,
                image2: data2.image
            }

            compareImages(civiImages, civi, message);
        }
    }

}