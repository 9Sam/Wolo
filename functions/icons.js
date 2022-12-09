function iconUnit(type){
    if(type == 1){ return "🏹";
    }else if(type == 2){ return "🐎";
    }else if(type == 3){ return "⚔";
    }else if(type == 4){ return "🚤";
    }else if(type == 5){ return "🌀";
    }
}

function iconCivi(type){
    if(type == 1){ return "⚔";
    }else if(type == 2){ return "🐎";
    }else if(type == 3){ return "🏹";
    }else if(type == 4){ return "👴";
    }else if(type == 5){ return "🚤";
    }else if(type == 6){ return "🌀";
    }else if(type == 7){ return "🐘";
    }else if(type == 8){ return "🏰";
    }else if(type == 9){ return "🐪";
    }else if(type == 10){ return "🧨";
    }else if(type == 11){ return "🏇";
    }
}

//📜 Devuelve el o los tipos de civilizaciones en un solo string con su respectivo símbolo.

function getCiviTypes(civis, ids){
    //@Param civis => nombres de las civilizaciones en formato puro
    //@Param ids => ids de las civilizaciones en formato puro

    let tipos;

    (ids.length > 1)
    ? tipos = ids.split(",")
    : tipos = ids;
    if(tipos.length > 1){
        tiposName = civis.split(",");
        return `${iconCivi(tipos[0])} ${tiposName[0]} | ${iconCivi(tipos[1])} ${tiposName[1]}`
    }else{
        return `${iconCivi(ids)} ${civis}`
    }
}

function getUnitTypes(units, ids){
    //@Param civis => nombres de las civilizaciones en formato puro
    //@Param ids => ids de las civilizaciones en formato puro

    console.log(ids)
    let tipos;
    (ids.length > 1)
    ? tipos = ids.split(",")
    : tipos = ids;
    
    if(tipos.length > 1){
        tiposName = units.split(",");
        return `${iconUnit(tipos[0])} ${tiposName[0]} | ${iconUnit(tipos[1])} ${tiposName[1]}`
    }else{
        return `${iconUnit(ids)} ${units}`
    }
}

module.exports = {
    getCiviTypes,
    getUnitTypes
}