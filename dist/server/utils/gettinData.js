"use strict";
// тут, как параметры, я получаю объект БД, получаю запрос и колбэк функцию, в которой, чуть позже, будет происходить магия
// последний параметр опциональный, чуть дальше в коде (файл index.ts) опишу зачем он тут нужен
function GettingDataFromDatabase(db, // хз какой тут тип :)
sql_query, callback, sql_additional) {
    db.query(sql_query, sql_additional, (err, data) => {
        if (err)
            callback(err, null);
        callback(null, data);
    });
}
module.exports = {
    GettingDataFromDatabase,
};
// возвращаемся обратно...
