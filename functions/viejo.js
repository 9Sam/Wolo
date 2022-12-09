mysqlConnection.query(
    `SELECT * FROM unit as u
    join unit_type as ut on ut.id_unit_type = u.id_unit_type
    join statistics as s on s.id_stats = u.id_stats
    where unit_name like "%${args[0]}%" or unit_name like "%${args[1]}%"
    order by case 
        when unit_name LIKE "%${args[0]}%" then 1 
        when unit_name LIKE "%${args[1]}%" then 2 
        else 3 
    end`,
    (err, rows, fields) => {
        if (!err) {
            if(rows[0] != undefined || rows[1] != undefined){
                unit(rows[0],rows[1]);
            }
        } else {
            console.log(err);
        }
    });