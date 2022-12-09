const mysqlConnection = require("../database/db.js");

//📜 It gets the information of a certaint troop
//💬 Al realizar una petición a la base de datos en un archivo externo se hace de manera asíncrona, por lo tanto la única forma de obtener los datos es esperando los resultados por eso en este caso se usó una promesa.
function getUnit(elem){
    return new Promise((resolve, reject) => {
        mysqlConnection.query(
            `SELECT * FROM unit as u
            join unit_type as ut on ut.id_unit_type = u.id_unit_type
            join statistics as s on s.id_stats = u.id_stats
            where unit_name like "%${elem}%";`,
            (err, rows, fields) => {
                console.log(rows)
                if (!err && rows != "") {
                    resolve(rows[0]);
                }else{
                    reject(console.error(err));
                }
            }
        )
    })
}

module.exports = {getUnit}
