// тут, как параметры, я получаю объект БД, получаю запрос и колбэк функцию, в которой, чуть позже, будет происходить магия
// последний параметр опциональный, чуть дальше в коде (файл index.ts) опишу зачем он тут нужен
function GettingDataFromDatabase(
  db: any, // хз какой тут тип :)
  sql_query: string,
  callback: (error: Error | null, data: any | null) => void,
  sql_additional?: string
) {
  db.query(sql_query, sql_additional, (err: Error, data: any) => {
    if (err) callback(err, null);
    callback(null, data);
  });
}

module.exports = {
  GettingDataFromDatabase,
};

// возвращаемся обратно...
